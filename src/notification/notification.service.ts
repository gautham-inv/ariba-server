import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }) {
    try {
      // @ts-ignore
      return await this.prisma.notification.create({
        data: {
          userId: data.userId,
          title: data.title,
          message: data.message,
          type: data.type,
        },
      });
    } catch (error) {
      console.error('Failed to create notification', error);
    }
  }

  async markAsRead(id: string) {
    // @ts-ignore
    return await this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async notifyRole(
    orgId: string,
    role: string,
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
  ) {
    const members = await this.prisma.member.findMany({
      where: {
        organizationId: orgId,
        role: { contains: role, mode: 'insensitive' },
      },
      select: { userId: true },
    });

    const notifications = members.map((m) =>
      this.createNotification({
        userId: m.userId,
        title,
        message,
        type,
      }),
    );

    return Promise.all(notifications);
  }

  async notifyOwner(
    orgId: string,
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
  ) {
    return this.notifyRole(orgId, 'owner', title, message, type);
  }
}
