import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsIn, IsNotEmpty, IsOptional} from 'class-validator';
import {DayOfWeek} from '../../constants';

export class SearchCalenderBodyDto {
    @ApiProperty({
        enum: [
            DayOfWeek.MONDAY,
            DayOfWeek.TUESDAY,
            DayOfWeek.WEDNESDAY,
            DayOfWeek.THURSDAY,
            DayOfWeek.FRIDAY,
            DayOfWeek.SATURDAY,
            DayOfWeek.SUNDAY
        ]
    })
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
    @IsOptional()
    day?: DayOfWeek;

    @ApiProperty()
    @Expose()
    @IsOptional()
    timeSlotName?: string;
}