import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class GetScheduleByDoctorParamDto {
    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    doctorId: string;
}
