import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdExpertiseParamDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string;
}
