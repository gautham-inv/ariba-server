import { PrismaService } from '../../core/prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
export declare class PurchaseOrderService {
    private prisma;
    private notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    createPO(data: {
        buyerOrgId: string;
        quoteId: string;
        notes?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        buyerOrgId: string;
        rfqId: string | null;
        supplierId: string;
        totalAmount: number;
        quoteId: string | null;
    }>;
    getPOsByOrg(orgId: string): Promise<({
        supplier: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            status: import(".prisma/client").$Enums.SupplierStatus;
            buyerOrgId: string;
        };
        quote: {
            id: string;
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
    })[]>;
    getPOById(id: string): Promise<{
        files: {
            id: string;
            organizationId: string;
            rfqId: string | null;
            quoteId: string | null;
            ownerType: import(".prisma/client").$Enums.FileOwnerType;
            ownerId: string;
            storageKey: string;
            contentType: string;
            uploadedAt: Date;
            poId: string | null;
        }[];
        supplier: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            status: import(".prisma/client").$Enums.SupplierStatus;
            buyerOrgId: string;
        };
        quote: {
            rfq: {
                items: {
                    id: string;
                    name: string;
                    description: string | null;
                    quantity: number;
                    unit: string;
                    rfqId: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                status: import(".prisma/client").$Enums.RFQStatus;
                title: string;
                dueDate: Date;
                currency: string;
                notes: string | null;
                buyerOrgId: string;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.QuoteStatus;
            notes: string | null;
            buyerOrgId: string;
            rfqId: string;
            supplierId: string;
            totalAmount: number;
            submittedAt: Date;
        };
        buyerOrg: {
            id: string;
            name: string;
            slug: string;
            logo: string | null;
            metadata: string | null;
            createdAt: Date;
            updatedAt: Date;
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
    }>;
    deletePO(id: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        buyerOrgId: string;
        rfqId: string | null;
        supplierId: string;
        totalAmount: number;
        quoteId: string | null;
    }>;
    sendPO(id: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        buyerOrgId: string;
        rfqId: string | null;
        supplierId: string;
        totalAmount: number;
        quoteId: string | null;
    }>;
}
