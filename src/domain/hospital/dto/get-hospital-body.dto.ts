import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class GetHospitalQueryDto {
    @Expose()
    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;
}
