import { IsNotEmpty, IsUUID, IsOptional, IsEnum } from 'class-validator';
import { BookingStatus } from '../constants';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteMedicalRecordQueryDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    bookingId: string;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    scheduleId?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(BookingStatus)
    status: BookingStatus;
}
