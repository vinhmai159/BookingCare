import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class TimeSlotIdParamDto {
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    id: string;
}