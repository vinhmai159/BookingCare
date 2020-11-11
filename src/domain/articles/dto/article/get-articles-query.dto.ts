import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetArticlesQueryDto {
    @ApiProperty({
        required: false
    })
    @IsOptional()
    title?: string;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    content?: string;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    category?: string;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    tag?: string;
}
