import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNotEmpty, IsString, IsIn} from 'class-validator';
import {DayOfWeek} from '../../constants';

export class UpdateCalenderBodyDto {
    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    @IsString()
    id: string;

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