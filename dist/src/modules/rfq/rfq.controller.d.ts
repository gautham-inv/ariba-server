import { RFQService } from './rfq.service';
import { CreateRFQDto } from './dto/create-rfq.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteStatusDto } from './dto/update-quote-status.dto';
export declare class RFQController {
    private readonly rfqService;
    constructor(rfqService: RFQService);
    createRFQ(orgId: string, body: CreateRFQDto): Promise<{
        suppliers: ({
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
            rfqId: string;
            invitedAt: Date;
            supplierId: string;
        })[];
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
                name: string;
                createdAt: Date;
                email: string;
                status: import(".prisma/client").$Enums.SupplierStatus;
                buyerOrgId: string;
            };
        } & {
            id: string;
            rfqId: string;
            invitedAt: Date;
            supplierId: string;
        })[];
        quotes: {
            id: string;
            status: import(".prisma/client").$Enums.QuoteStatus;
            notes: string | null;
            buyerOrgId: string;
            rfqId: string;
            supplierId: string;
            totalAmount: number;
            submittedAt: Date;
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
    })[]>;
    getRFQ(id: string): Promise<{
        suppliers: ({
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
            rfqId: string;
            invitedAt: Date;
            supplierId: string;
        })[];
        quotes: ({
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
        } & {
            id: string;
            status: import(".prisma/client").$Enums.QuoteStatus;
            notes: string | null;
            buyerOrgId: string;
            rfqId: string;
            supplierId: string;
            totalAmount: number;
            submittedAt: Date;
        })[];
        buyerOrg: {
            id: string;
            name: string;
            slug: string;
            logo: string | null;
            metadata: string | null;
            createdAt: Date;
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
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.RFQStatus;
        title: string;
        dueDate: Date;
        currency: string;
        notes: string | null;
        buyerOrgId: string;
    }>;
    createQuote(id: string, body: CreateQuoteDto): Promise<any>;
    updateQuoteStatus(id: string, body: UpdateQuoteStatusDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.QuoteStatus;
        notes: string | null;
        buyerOrgId: string;
        rfqId: string;
        supplierId: string;
        totalAmount: number;
        submittedAt: Date;
    }>;
    deleteRFQ(id: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.RFQStatus;
        title: string;
        dueDate: Date;
        currency: string;
        notes: string | null;
        buyerOrgId: string;
    }>;
}
