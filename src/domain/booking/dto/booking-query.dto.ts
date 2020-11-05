import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingQueryDto {
    @ApiProperty({required: false})
    @IsUUID()
    @IsOptional()
    scheduleId?: string;

    @ApiProperty({required: false})
    @IsUUID()
    @IsOptional()
    bookingId?: string;
}
