import { ApprovalService } from './approval.service';
import { CreateRuleDto } from './dto/create-rule.dto';
export declare class ApprovalController {
    private readonly approvalService;
    constructor(approvalService: ApprovalService);
    createRule(orgId: string, body: CreateRuleDto): Promise<{
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
    approveRequest(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        approvedById: string | null;
    }>;
    rejectRequest(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ApprovalStatus;
        buyerOrgId: string;
        entityId: string;
        entityType: import(".prisma/client").$Enums.ApprovalEntity;
        approvedById: string | null;
    }>;
}
