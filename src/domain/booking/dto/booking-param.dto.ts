import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingParamDto {
    @ApiProperty({ required: false })
    @IsUUID()
    @IsNotEmpty()
    bookingId?: string;
}
