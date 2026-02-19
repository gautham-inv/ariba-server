declare class CreateRFQItemDto {
    name: string;
    description?: string;
    quantity: number;
    unit: string;
}
export declare class CreateRFQDto {
    title: string;
    dueDate: Date;
    currency: string;
    notes?: string;
    items: CreateRFQItemDto[];
    supplierIds: string[];
}
export {};
