import { IsNotEmpty, IsUUID, IsOptional, IsEnum } from 'class-validator';
import { BookingStatus } from '../constants';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusQueryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(BookingStatus)
    status: BookingStatus;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    bookingId: string;
}
