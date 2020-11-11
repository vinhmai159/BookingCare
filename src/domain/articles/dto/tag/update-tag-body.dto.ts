import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTagBodyDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
