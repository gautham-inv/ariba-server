import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { organization } from 'better-auth/plugins';
import { EmailService } from '../email/email.service';
import { ac, roles } from './permissions';

const prisma = new PrismaService();
const emailService = new EmailService();

// Default organization ID - this should be seeded in the database
// For single-org mode, all users are automatically added to this organization
const DEFAULT_ORG_SLUG = process.env.DEFAULT_ORG_SLUG || 'default-org';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            // Find the default organization
            const defaultOrg = await prisma.organization.findFirst({
              where: { slug: DEFAULT_ORG_SLUG },
            });

            if (defaultOrg) {
              // Check if user has a pending invitation
              // If they do, skip auto-creation - the invitation acceptance will handle it
              const pendingInvitation = await prisma.invitation.findFirst({
                where: {
                  email: user.email,
                  organizationId: defaultOrg.id,
                  status: { in: ['pending', 'accepted'] },
                },
              });

              if (pendingInvitation) {
                console.log(
                  `[Auth] User ${user.email} has a pending/accepted invitation. Skipping auto-add to organization.`,
                );
                return;
              }

              // Check if user is already a member (shouldn't be, but safety check)
              const existingMember = await prisma.member.findUnique({
                where: {
                  organizationId_userId: {
                    organizationId: defaultOrg.id,
                    userId: user.id,
                  },
                },
              });

              if (!existingMember) {
                // Add user to default organization as 'owner' role
                // This only happens for users who sign up directly (not via invitation)
                await prisma.member.create({
                  data: {
                    organizationId: defaultOrg.id,
                    userId: user.id,
                    role: 'owner', // Default role for users who sign up directly
                  },
                });
                console.log(
                  `[Auth] Auto-added user ${user.email} to default organization as owner`,
                );
              }
            } else {
              console.warn(
                `[Auth] Default organization with slug '${DEFAULT_ORG_SLUG}' not found. User ${user.email} was not auto-assigned to any organization.`,
              );
            }
          } catch (error) {
            console.error(
              '[Auth] Failed to auto-assign user to default organization:',
              error,
            );
          }
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          try {
            // Auto-set activeOrganizationId to the default org on session creation
            const defaultOrg = await prisma.organization.findFirst({
              where: { slug: DEFAULT_ORG_SLUG },
            });

            if (defaultOrg && !session.activeOrganizationId) {
              await prisma.session.update({
                where: { id: session.id },
                data: { activeOrganizationId: defaultOrg.id },
              });
              console.log(
                `[Auth] Auto-set activeOrganizationId for session ${session.id}`,
              );
            }
          } catch (error) {
            console.error(
              '[Auth] Failed to auto-set activeOrganizationId:',
              error,
            );
          }
        },
      },
    },
  },
  plugins: [
    organization({
      ac,
      roles,
      creatorRoleId: 'owner',
      async sendInvitationEmail(data) {
        await emailService.sendOrganizationInvitation({
          email: data.email,
          inviterEmail: data.inviter.user.email || '',
          organizationName: data.organization.name,
          url: `${process.env.FRONTEND_URL || 'http://localhost:3001'}/accept-invitation?id=${data.id}`,
          expiresAt: data.invitation.expiresAt,
        });
      },
      organizationHooks: {
        afterAcceptInvitation: async (ctx) => {
          try {
            // @ts-ignore
            await prisma.notification.create({
              data: {
                userId: ctx.invitation.inviterId,
                title: 'Invitation Accepted',
                message: `${ctx.user.name || ctx.user.email} has joined ${ctx.organization.name} as ${ctx.member.role}`,
                type: 'success',
              },
            });
          } catch (error) {
            console.error('Failed to create bio notification', error);
          }
        },
      },
    }),
  ],
  trustedOrigins: [process.env.FRONTEND_URL || 'http://localhost:3001'],
  advanced: {
    // Required for cross-origin: frontend and backend on different Render URLs.
    // Browser only sends cookies on cross-origin requests when SameSite=None; Secure.
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
    },
  },
});
