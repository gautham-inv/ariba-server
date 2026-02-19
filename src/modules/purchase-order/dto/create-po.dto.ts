import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePODto {
    @IsString()
    @IsNotEmpty()
    quoteId: string;

    @IsString()
    @IsOptional()
    notes?: string;
}
