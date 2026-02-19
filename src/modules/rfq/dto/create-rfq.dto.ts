import { IsString, IsDate, IsArray, IsOptional, ValidateNested, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class CreateRFQItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    unit: string;
}

export class CreateRFQDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @Type(() => Date)
    @IsDate()
    dueDate: Date;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateRFQItemDto)
    items: CreateRFQItemDto[];

    @IsArray()
    @IsString({ each: true })
    supplierIds: string[];
}
