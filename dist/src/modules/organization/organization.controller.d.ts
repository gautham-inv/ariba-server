import { EmailService } from '../../core/email/email.service';
import { PrismaService } from '../../core/prisma/prisma.service';
export declare class OrganizationController {
    private readonly emailService;
    private readonly prisma;
    constructor(emailService: EmailService, prisma: PrismaService);
    getNotifications(userId: string): Promise<{
        id: string;
        createdAt: Date;
        read: boolean;
        userId: string;
        type: string;
        title: string;
        message: string;
    }[]>;
    markNotificationsRead(userId: string): Promise<{
        success: boolean;
    }>;
    getMembers(orgId: string): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        organizationId: string;
        role: string;
    })[]>;
    verifyInvitation(id: string): Promise<{
        id: string;
        email: string;
        role: string;
        organizationName: any;
        orgId: any;
        existingUser: boolean;
    }>;
    deleteMember(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        organizationId: string;
        role: string;
    }>;
}
