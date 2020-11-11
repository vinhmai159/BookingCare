import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ArticleParamDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    articleId: string;
}
