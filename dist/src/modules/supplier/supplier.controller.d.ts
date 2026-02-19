import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    createSupplier(orgId: string, body: CreateSupplierDto): Promise<{
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
