import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArticleBodyDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    categories: string[];

    @ApiProperty({
        required: false
    })
    @IsOptional()
    tags: string[];
}
