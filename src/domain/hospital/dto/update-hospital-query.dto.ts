import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateHospitalBodyDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Expose()
    @IsOptional()
    @ApiProperty()
    description: string;
}
