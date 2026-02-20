import { RFQService } from './rfq.service';
import { CreateRFQDto } from './dto/create-rfq.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteStatusDto } from './dto/update-quote-status.dto';
export declare class RFQController {
    private readonly rfqService;
    constructor(rfqService: RFQService);
    createRFQ(orgId: string, body: CreateRFQDto): Promise<{
        items: {
            id: string;
            name: string;
            description: string | null;
            quantity: number;
            unit: string;
            rfqId: string;
        }[];
        suppliers: ({
            supplier: {
                id: string;
                status: import(".prisma/client").$Enums.SupplierStatus;
                createdAt: Date;
                buyerOrgId: string;
                name: string;
                email: string;
            };
        } & {
            id: string;
            rfqId: string;
            invitedAt: Date;
            supplierId: string;
        })[];
    } & {
        id: string;
        title: string;
        dueDate: Date;
        currency: string;
        notes: string | null;
        status: import(".prisma/client").$Enums.RFQStatus;
        createdAt: Date;
        buyerOrgId: string;
    }>;
    sendRFQ(id: string): Promise<{
        success: boolean;
        totalSuppliers: number;
        successfulEmails: number;
    }>;
    getRFQs(orgId: string): Promise<({
        suppliers: ({
            supplier: {
                id: string;
                status: import(".prisma/client").$Enums.SupplierStatus;
                createdAt: Date;
                buyerOrgId: string;
                name: string;
                email: string;
            };
        } & {
            id: string;
            rfqId: string;
            invitedAt: Date;
            supplierId: string;
        })[];
        quotes: {
            id: string;
            notes: string | null;
            status: import(".prisma/client").$Enums.QuoteStatus;
            buyerOrgId: string;
            rfqId: string;
            supplierId: string;
            totalAmount: number;
            submittedAt: Date;
        }[];
    } & {
        id: string;
        title: string;
        dueDate: Date;
        currency: string;
        notes: string | null;
        status: import(".prisma/client").$Enums.RFQStatus;
        createdAt: Date;
        buyerOrgId: string;
    })[]>;
    getRFQ(id: string): Promise<{
        buyerOrg: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
            logo: string | null;
            metadata: string | null;
            updatedAt: Date;
        };
        items: {
            id: string;
            name: string;
            description: string | null;
            quantity: number;
            unit: string;
            rfqId: string;
        }[];
        suppliers: ({
            supplier: {
                id: string;
                status: import(".prisma/client").$Enums.SupplierStatus;
                createdAt: Date;
                buyerOrgId: string;
                name: string;
                email: string;
            };
        } & {
            id: string;
            rfqId: string;
            invitedAt: Date;
            supplierId: string;
        })[];
        quotes: ({
            files: {
                id: string;
                rfqId: string | null;
                ownerType: import(".prisma/client").$Enums.FileOwnerType;
                ownerId: string;
                organizationId: string;
                storageKey: string;
                contentType: string;
                uploadedAt: Date;
                quoteId: string | null;
                poId: string | null;
            }[];
            supplier: {
                id: string;
                status: import(".prisma/client").$Enums.SupplierStatus;
                createdAt: Date;
                buyerOrgId: string;
                name: string;
                email: string;
            };
        } & {
            id: string;
            notes: string | null;
            status: import(".prisma/client").$Enums.QuoteStatus;
            buyerOrgId: string;
            rfqId: string;
            supplierId: string;
            totalAmount: number;
            submittedAt: Date;
        })[];
    } & {
        id: string;
        title: string;
        dueDate: Date;
        currency: string;
        notes: string | null;
        status: import(".prisma/client").$Enums.RFQStatus;
        createdAt: Date;
        buyerOrgId: string;
    }>;
    createQuote(id: string, body: CreateQuoteDto): Promise<any>;
    updateQuoteStatus(id: string, body: UpdateQuoteStatusDto): Promise<{
        id: string;
        notes: string | null;
        status: import(".prisma/client").$Enums.QuoteStatus;
        buyerOrgId: string;
        rfqId: string;
        supplierId: string;
        totalAmount: number;
        submittedAt: Date;
    }>;
    deleteRFQ(id: string): Promise<{
        id: string;
        title: string;
        dueDate: Date;
        currency: string;
        notes: string | null;
        status: import(".prisma/client").$Enums.RFQStatus;
        createdAt: Date;
        buyerOrgId: string;
    }>;
}
