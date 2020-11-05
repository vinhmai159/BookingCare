import {ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ScheduleQueryDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    scheduleId: string;
}
