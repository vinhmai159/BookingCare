import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNotEmpty, IsString} from 'class-validator';

export class CalenderIdParamDto {
    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    @IsString()
    id: string;
}