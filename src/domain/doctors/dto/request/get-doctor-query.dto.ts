import {Expose} from 'class-transformer';
import {IsString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class GetDoctorQueryDto {
    @Expose()
    @IsOptional()
    @ApiProperty()
    name?: string;

    @Expose()
    @IsOptional()
    @ApiProperty()
    expertise?: string;
}