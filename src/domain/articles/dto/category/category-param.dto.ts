import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CategoryParamDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    categoryId: string;
}
