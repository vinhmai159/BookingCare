import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoryBodyDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
