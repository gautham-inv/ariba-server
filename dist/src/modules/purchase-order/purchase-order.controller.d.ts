import { PurchaseOrderService } from './purchase-order.service';
import { CreatePODto } from './dto/create-po.dto';
export declare class PurchaseOrderController {
    private readonly poService;
    constructor(poService: PurchaseOrderService);
    createPO(orgId: string, body: CreatePODto): Promise<{
        id: string;
        quoteId: string | null;
        buyerOrgId: string;
        supplierId: string;
        rfqId: string | null;
        totalAmount: number;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        createdAt: Date;
    }>;
    getPOsByOrg(orgId: string): Promise<({
        supplier: {
            id: string;
            buyerOrgId: string;
            status: import(".prisma/client").$Enums.SupplierStatus;
            createdAt: Date;
            name: string;
            email: string;
        };
        quote: {
            id: string;
        };
    } & {
        id: string;
        quoteId: string | null;
        buyerOrgId: string;
        supplierId: string;
        rfqId: string | null;
        totalAmount: number;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        createdAt: Date;
    })[]>;
    getPOById(id: string): Promise<{
        supplier: {
            id: string;
            buyerOrgId: string;
            status: import(".prisma/client").$Enums.SupplierStatus;
            createdAt: Date;
            name: string;
            email: string;
        };
        quote: {
            rfq: {
                items: {
                    id: string;
                    rfqId: string;
                    name: string;
                    description: string | null;
                    quantity: number;
                    unit: string;
                }[];
            } & {
                id: string;
                buyerOrgId: string;
                status: import(".prisma/client").$Enums.RFQStatus;
                notes: string | null;
                createdAt: Date;
                title: string;
                dueDate: Date;
                currency: string;
            };
        } & {
            id: string;
            buyerOrgId: string;
            supplierId: string;
            rfqId: string;
            totalAmount: number;
            status: import(".prisma/client").$Enums.QuoteStatus;
            notes: string | null;
            submittedAt: Date;
        };
        buyerOrg: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
            logo: string | null;
            metadata: string | null;
            updatedAt: Date;
        };
        files: {
            id: string;
            quoteId: string | null;
            rfqId: string | null;
            ownerType: import(".prisma/client").$Enums.FileOwnerType;
            ownerId: string;
            organizationId: string;
            storageKey: string;
            contentType: string;
            uploadedAt: Date;
            poId: string | null;
        }[];
    } & {
        id: string;
        quoteId: string | null;
        buyerOrgId: string;
        supplierId: string;
        rfqId: string | null;
        totalAmount: number;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        createdAt: Date;
    }>;
    deletePO(id: string): Promise<{
        id: string;
        quoteId: string | null;
        buyerOrgId: string;
        supplierId: string;
        rfqId: string | null;
        totalAmount: number;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        createdAt: Date;
    }>;
    sendPO(id: string): Promise<{
        id: string;
        quoteId: string | null;
        buyerOrgId: string;
        supplierId: string;
        rfqId: string | null;
        totalAmount: number;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        createdAt: Date;
    }>;
}
