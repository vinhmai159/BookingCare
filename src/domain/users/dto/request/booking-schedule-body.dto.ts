import { Exclude, Expose } from 'class-transformer';
import {IsString, IsUUID} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class BookingScheduleBodyDto {
    @Expose()
    @IsString()
    @IsUUID()
    @ApiProperty()
    scheduleId: string;
}
