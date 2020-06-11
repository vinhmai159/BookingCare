import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateOneSchedulesQueryDto {

    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    calenderId: string;
}
