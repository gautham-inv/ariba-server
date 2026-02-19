import { PrismaService } from '../../core/prisma/prisma.service';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    createNotification(data: {
        userId: string;
        title: string;
        message: string;
        type: 'info' | 'success' | 'warning' | 'error';
    }): Promise<{
        id: string;
        createdAt: Date;
        read: boolean;
        userId: string;
        type: string;
        title: string;
        message: string;
    }>;
    markAsRead(id: string): Promise<{
        id: string;
        createdAt: Date;
        read: boolean;
        userId: string;
        type: string;
        title: string;
        message: string;
    }>;
    notifyRole(orgId: string, role: string, title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error'): Promise<{
        id: string;
        createdAt: Date;
        read: boolean;
        userId: string;
        type: string;
        title: string;
        message: string;
    }[]>;
    notifyOwner(orgId: string, title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error'): Promise<{
        id: string;
        createdAt: Date;
        read: boolean;
        userId: string;
        type: string;
        title: string;
        message: string;
    }[]>;
}
