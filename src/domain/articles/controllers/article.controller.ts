import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, AuthMode, jwt } from '../../../common';
import { ArticleServiceToken } from '../constants';
import { Article } from '../entities';
import { IArticleService } from '../interfaces';
import { Doctor } from '../../doctors';
import { Admin } from '../../admin';
import { ArticleParamDto, CreateArticleBodyDto, GetArticlesQueryDto, UpdateArticleBodyDto } from '../dto';
import { plainToClass } from 'class-transformer';

interface ArticleResponse {
    data: Article[];
    total: number;
}

@ApiBearerAuth()
@ApiTags('article')
@Controller('/article')
export class ArticleController {
    constructor(
        @Inject(ArticleServiceToken)
        private readonly articleService: IArticleService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: Article,
        description: 'Create schedule is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    @Post()
    public async createArticle(@jwt() author: Doctor | Admin, @Body() bodyDto: CreateArticleBodyDto): Promise<Article> {
        const data = await this.articleService.createArticle(
            author.id,
            plainToClass(Article, bodyDto),
            bodyDto.categories,
            bodyDto.tags
        );

        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Article,
        description: 'Get schedule is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:articleId')
    public async getArticle(@Param() paramDto: ArticleParamDto): Promise<Article> {
        const data = await this.articleService.getArticle(paramDto.articleId);

        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Article,
        description: 'Get article are successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    public async getArticles(@Query() queryDto: GetArticlesQueryDto): Promise<ArticleResponse> {
        const [data, total] = await this.articleService.getArticles(
            null,
            queryDto.title,
            queryDto.content,
            queryDto.category,
            queryDto.tag
        );
        return { data, total };
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Article,
        description: 'Update article is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    @Put('/:articleId')
    public async updateArticle(
        @Param() paramDto: ArticleParamDto,
        @Body() bodyDto: UpdateArticleBodyDto
    ): Promise<Article> {
        const data = await this.articleService.updateArticle(
            paramDto.articleId,
            bodyDto.title,
            bodyDto.content,
            bodyDto.categories,
            bodyDto.tags
        );
        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Article,
        description: 'Delete article is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.ADMIN_GUARD])
    @Delete('/:articleId')
    public async deleteArticle(@Param() paramDto: ArticleParamDto): Promise<boolean> {
        const data = await this.articleService.deleteArticle(paramDto.articleId);

        return data;
    }
}
