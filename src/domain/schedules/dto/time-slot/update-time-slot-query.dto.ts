import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsString, IsNotEmpty} from 'class-validator';

export class UpdateTimeSlotQueryDto {
    @ApiProperty()
    @Expose()
    @IsString()
    startTime: string;

    @ApiProperty()
    @Expose()
    @IsString()
    endTime: string;
}