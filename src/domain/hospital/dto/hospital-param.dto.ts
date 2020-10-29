import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class HospitalParamDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    hospitalId: string;
}
