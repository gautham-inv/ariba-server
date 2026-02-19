import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateQuoteStatusDto {
    @IsEnum(['RECEIVED', 'CONFIRMED', 'ACCEPTED', 'REJECTED'])
    @IsNotEmpty()
    status: 'RECEIVED' | 'CONFIRMED' | 'ACCEPTED' | 'REJECTED';
}
