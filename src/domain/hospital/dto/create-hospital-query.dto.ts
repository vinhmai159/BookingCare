import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHospitalBodyDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Expose()
    @IsOptional()
    @ApiProperty()
    description: string;
}
