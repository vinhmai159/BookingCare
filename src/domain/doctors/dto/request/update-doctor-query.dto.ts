import {Expose} from 'class-transformer';
import { MaxLength, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateDoctorQueryDto {
    @Expose()
    @ApiProperty()
    @IsOptional()
    fistName?: string;

    @Expose()
    @ApiProperty()
    @IsOptional()
    lastName?: string;

    @Expose()
    @ApiProperty()
    @IsOptional()
    description?: string;

    @Expose()
    @ApiProperty()
    @IsOptional()
    addressDetail?: string;

    @Expose()
    @ApiProperty()
    @IsOptional()
    expertiseId?: string;

    @Expose()
    @ApiProperty()
    @IsOptional()
    hospitalId?: string;
}