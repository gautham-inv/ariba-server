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
    sendRFQ(rfqId: string): Promise<{
        success: boolean;
        totalSuppliers: number;
        successfulEmails: number;
    }>;
    getRFQs(organizationId: string): Promise<({
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
    createQuote(data: {
        rfqId: string;
        supplierId: string;
        totalAmount: number;
        notes?: string;
    }): Promise<any>;
    updateQuoteStatus(quoteId: string, status: 'RECEIVED' | 'CONFIRMED' | 'ACCEPTED' | 'REJECTED'): Promise<{
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
