import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
    @IsString()
    @IsNotEmpty()
    supplierId: string;

    @IsNumber()
    totalAmount: number;

    @IsString()
    @IsOptional()
    notes?: string;
}
