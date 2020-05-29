import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsIn, IsNotEmpty} from 'class-validator';
import {DayOfWeek} from '../../constants';

export class SearchCalenderBodyDto {
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
    timeSlotName: string;
}