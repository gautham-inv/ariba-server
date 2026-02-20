import { PrismaService } from '../../core/prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { EmailService } from '../../core/email/email.service';
export declare class ApprovalService {
    private prisma;
    private notificationService;
    private emailService;
    constructor(prisma: PrismaService, notificationService: NotificationService, emailService: EmailService);
    createRule(data: {
        buyerOrgId: string;
        minAmount: number;
        currency: string;
        role: string;
    }): Promise<{
        id: string;
        minAmount: number;
        role: string;
        createdAt: Date;
        buyerOrgId: string;
    }>;
    getRules(orgId: string): Promise<{
        id: string;
        minAmount: number;
        role: string;
        createdAt: Date;
        buyerOrgId: string;
    }[]>;
    evaluatePORules(poId: string, totalAmount: number, orgId: string, currency?: string): Promise<{
        required: boolean;
    }>;
    getPendingRequests(orgId: string): Promise<({
        id: string;
        createdAt: Date;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        approvedById: string | null;
    } | {
        purchaseOrder: {
            supplier: {
                id: string;
                createdAt: Date;
                buyerOrgId: string;
                name: string;
                status: import(".prisma/client").$Enums.SupplierStatus;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            buyerOrgId: string;
            status: import(".prisma/client").$Enums.POStatus;
            quoteId: string | null;
            supplierId: string;
            rfqId: string | null;
            totalAmount: number;
            notes: string | null;
        };
        id: string;
        createdAt: Date;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        approvedById: string | null;
    })[]>;
    approveRequest(requestId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        approvedById: string | null;
    }>;
    rejectRequest(requestId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        approvedById: string | null;
    }>;
}
