import { PrismaService } from '../../core/prisma/prisma.service';
export declare class SupplierService {
    private prisma;
    constructor(prisma: PrismaService);
    createSupplier(data: {
        buyerOrgId: string;
        name: string;
        email: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        status: import(".prisma/client").$Enums.SupplierStatus;
        buyerOrgId: string;
    }>;
    getSuppliersByOrg(orgId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        status: import(".prisma/client").$Enums.SupplierStatus;
        buyerOrgId: string;
    }[]>;
    deleteSupplier(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        status: import(".prisma/client").$Enums.SupplierStatus;
        buyerOrgId: string;
    }>;
}
