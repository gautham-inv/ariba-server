import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateRuleDto {
    @IsNumber()
    minAmount: number;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}
