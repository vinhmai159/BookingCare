import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetCategoriesQueryDto {
    @ApiProperty({
        required: false
    })
    @IsOptional()
    name?: string;
}
