import { DayOfWeek } from '../../../constants';
import {IsIn, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class ScheduleByDoctor {
    @Expose()
    @ApiProperty()
    @IsIn([
        DayOfWeek.MONDAY,
        DayOfWeek.TUESDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.THURSDAY,
        DayOfWeek.FRIDAY,
        DayOfWeek.SATURDAY,
        DayOfWeek.SUNDAY
    ])
    day: DayOfWeek;

    @Expose()
    @ApiProperty()
    @IsString()
    timeSlot: string;
}