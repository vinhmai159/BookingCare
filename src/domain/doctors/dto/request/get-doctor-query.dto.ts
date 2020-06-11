import {Expose} from 'class-transformer';
import {IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class GetDoctorQueryDto {
    @Expose()
    @ApiProperty()
    name: string;
}