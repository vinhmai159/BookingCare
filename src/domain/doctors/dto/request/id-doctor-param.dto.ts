import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class IdDoctorParamDto {
    @Expose()
    @ApiProperty()
    id: string
}