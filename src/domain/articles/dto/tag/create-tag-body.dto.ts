import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTagBodyDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
