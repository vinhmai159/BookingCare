import { IdExpertiseParamDto } from './id-expertise-param.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {Expose} from 'class-transformer';

export class CreateExpertiseBodyDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}