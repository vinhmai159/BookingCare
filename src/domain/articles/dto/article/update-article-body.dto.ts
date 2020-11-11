import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArticleBodyDto {
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
    categories?: string[];

    @ApiProperty({
        required: false
    })
    @IsOptional()
    tags?: string[];
}
