import { PrismaService } from '../../core/prisma/prisma.service';
import { EmailService } from '../../core/email/email.service';
import { NotificationService } from '../notification/notification.service';
export declare class RFQService {
    private prisma;
    private emailService;
    private notificationService;
    constructor(prisma: PrismaService, emailService: EmailService, notificationService: NotificationService);
    createRFQ(data: {
        buyerOrgId: string;
        title: string;
        dueDate: Date;
        currency: string;
        notes?: string;
        items: {
            name: string;
            description?: string;
            quantity: number;
            unit: string;
        }[];
        supplierIds: string[];
    }): Promise<{
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
    sendRFQ(rfqId: string): Promise<{
        success: boolean;
        totalSuppliers: number;
        successfulEmails: number;
    }>;
    getRFQs(organizationId: string): Promise<({
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
    createQuote(data: {
        rfqId: string;
        supplierId: string;
        totalAmount: number;
        notes?: string;
    }): Promise<any>;
    updateQuoteStatus(quoteId: string, status: 'RECEIVED' | 'CONFIRMED' | 'ACCEPTED' | 'REJECTED'): Promise<{
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
