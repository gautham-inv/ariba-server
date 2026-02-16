import {
  Controller,
  Post,
  Body,
  Get,
  Headers as HeadersDecorator,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from '../../core/email/email.service';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import { ActiveOrgId } from '../../core/auth/decorators/active-org.decorator';
import { PermissionsGuard } from '../../core/auth/guards/permissions.guard';
import { RequirePermissions } from '../../core/auth/decorators/permissions.decorator';

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) { }

  @Get('notifications')
  async getNotifications(@CurrentUser('id') userId: string) {
    if (!userId) {
      return [];
    }

    // @ts-ignore
    const notifications = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return notifications;
  }

  @Post('notifications/read-all')
  async markNotificationsRead(@CurrentUser('id') userId: string) {
    if (!userId) return { success: false };

    await this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });

    return { success: true };
  }

  @Get('members')
  @UseGuards(PermissionsGuard)
  @RequirePermissions({ member: ['read'] })
  async getMembers(@ActiveOrgId() orgId: string) {
    const members = await this.prisma.member.findMany({
      where: { organizationId: orgId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return members;
  }

  @Get('verify-invitation/:id')
  async verifyInvitation(@Param('id') id: string) {
    // @ts-ignore
    const invitation = await this.prisma.invitation.findUnique({
      where: { id },
      include: { organization: true },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: invitation.email },
    });

    return {
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      organizationName: (invitation as any).organization.name,
      orgId: (invitation as any).organizationId,
      existingUser: !!user,
    };
  }
}
