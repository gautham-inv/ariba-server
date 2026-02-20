import { ApprovalService } from './approval.service';
import { CreateRuleDto } from './dto/create-rule.dto';
export declare class ApprovalController {
    private readonly approvalService;
    constructor(approvalService: ApprovalService);
    createRule(orgId: string, body: CreateRuleDto): Promise<{
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
    approveRequest(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        approvedById: string | null;
    }>;
    rejectRequest(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        approvedById: string | null;
    }>;
}
