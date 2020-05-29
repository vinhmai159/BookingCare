import { TimeSlot } from '../../entities/timeSlot.entity';
import { DayOfWeek } from '../../constants';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsIn, IsNotEmpty} from 'class-validator';
export class SaveCalenderDataDto {
    @ApiProperty()
    @Expose()
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

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    timeSlotId: string;
}