import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetArticlesQueryDto {
    @ApiProperty({
        required: false
    })
    @IsOptional()
    keyword?: string;
}
