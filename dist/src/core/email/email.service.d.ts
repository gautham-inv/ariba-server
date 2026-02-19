export declare class EmailService {
    private resendApiKey;
    constructor();
    private get fromOnboarding();
    private get fromProcurement();
    private sendMail;
    sendOrganizationInvitation(data: {
        email: string;
        inviterEmail: string;
        organizationName: string;
        url: string;
        expiresAt: Date;
    }): Promise<boolean>;
    sendPurchaseOrder(data: {
        supplierEmail: string;
        supplierName: string;
        poId: string;
        totalAmount: number;
        currency: string;
        organizationName: string;
        notes?: string;
    }): Promise<boolean>;
    sendRFQ(data: {
        supplierEmail: string;
        supplierName: string;
        rfqTitle: string;
        rfqId: string;
        dueDate: Date;
        organizationName: string;
        rfqNotes?: string;
        items: {
            name: string;
            quantity: number;
            unit: string;
            description?: string;
        }[];
    }): Promise<boolean>;
}
