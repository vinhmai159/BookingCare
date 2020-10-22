import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateScheduleParamDto {
    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    calenderId: string;
}
