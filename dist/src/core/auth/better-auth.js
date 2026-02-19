"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const prisma_service_1 = require("../prisma/prisma.service");
const plugins_1 = require("better-auth/plugins");
const email_service_1 = require("../email/email.service");
const permissions_1 = require("./permissions");
const prisma = new prisma_service_1.PrismaService();
const emailService = new email_service_1.EmailService();
const DEFAULT_ORG_SLUG = process.env.DEFAULT_ORG_SLUG || 'default-org';
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(prisma, {
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
                        const defaultOrg = await prisma.organization.findFirst({
                            where: { slug: DEFAULT_ORG_SLUG },
                        });
                        if (defaultOrg) {
                            const pendingInvitation = await prisma.invitation.findFirst({
                                where: {
                                    email: user.email,
                                    organizationId: defaultOrg.id,
                                    status: { in: ['pending', 'accepted'] },
                                },
                            });
                            if (pendingInvitation) {
                                console.log(`[Auth] User ${user.email} has a pending/accepted invitation. Skipping auto-add to organization.`);
                                return;
                            }
                            const existingMember = await prisma.member.findUnique({
                                where: {
                                    organizationId_userId: {
                                        organizationId: defaultOrg.id,
                                        userId: user.id,
                                    },
                                },
                            });
                            if (!existingMember) {
                                await prisma.member.create({
                                    data: {
                                        organizationId: defaultOrg.id,
                                        userId: user.id,
                                        role: 'owner',
                                    },
                                });
                                console.log(`[Auth] Auto-added user ${user.email} to default organization as owner`);
                            }
                        }
                        else {
                            console.warn(`[Auth] Default organization with slug '${DEFAULT_ORG_SLUG}' not found. User ${user.email} was not auto-assigned to any organization.`);
                        }
                    }
                    catch (error) {
                        console.error('[Auth] Failed to auto-assign user to default organization:', error);
                    }
                },
            },
        },
        session: {
            create: {
                before: async (session) => {
                    try {
                        const defaultOrg = await prisma.organization.findFirst({
                            where: { slug: DEFAULT_ORG_SLUG },
                        });
                        if (defaultOrg) {
                            return {
                                data: {
                                    ...session,
                                    activeOrganizationId: defaultOrg.id,
                                },
                            };
                        }
                    }
                    catch (error) {
                        console.error('[Auth] Failed to auto-set activeOrganizationId in before hook:', error);
                    }
                },
            },
        },
    },
    plugins: [
        (0, plugins_1.organization)({
            ac: permissions_1.ac,
            roles: permissions_1.roles,
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
                        await prisma.notification.create({
                            data: {
                                userId: ctx.invitation.inviterId,
                                title: 'Invitation Accepted',
                                message: `${ctx.user.name || ctx.user.email} has joined ${ctx.organization.name} as ${ctx.member.role}`,
                                type: 'success',
                            },
                        });
                    }
                    catch (error) {
                        console.error('Failed to create bio notification', error);
                    }
                },
            },
        }),
    ],
    trustedOrigins: [process.env.FRONTEND_URL || 'http://localhost:3001'],
    advanced: {
        defaultCookieAttributes: {
            sameSite: 'none',
            secure: true,
        },
    },
});
//# sourceMappingURL=better-auth.js.map