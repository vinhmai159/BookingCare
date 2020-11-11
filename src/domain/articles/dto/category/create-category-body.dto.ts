import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryBodyDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
