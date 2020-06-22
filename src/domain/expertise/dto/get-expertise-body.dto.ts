import {ApiProperty} from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {Expose} from 'class-transformer';

export class GetExpertiseBodyDto {
    @Expose()
    @IsOptional()
    @ApiProperty()
    name?: string;
}