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
        role: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        role: string;
        buyerOrgId: string;
        minAmount: number;
    }>;
    getRules(orgId: string): Promise<{
        id: string;
        createdAt: Date;
        role: string;
        buyerOrgId: string;
        minAmount: number;
    }[]>;
    evaluatePORules(poId: string, totalAmount: number, orgId: string): Promise<{
        required: boolean;
    }>;
    getPendingRequests(orgId: string): Promise<({
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        approvedById: string | null;
    } | {
        purchaseOrder: {
            supplier: {
                id: string;
                name: string;
                createdAt: Date;
                email: string;
                status: import(".prisma/client").$Enums.SupplierStatus;
                buyerOrgId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.POStatus;
            notes: string | null;
            buyerOrgId: string;
            rfqId: string | null;
            supplierId: string;
            totalAmount: number;
            quoteId: string | null;
        };
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        approvedById: string | null;
    })[]>;
    approveRequest(requestId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        approvedById: string | null;
    }>;
    rejectRequest(requestId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        approvedById: string | null;
    }>;
}
