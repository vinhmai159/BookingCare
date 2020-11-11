import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { Article } from '../entities';
import { IArticleService } from '../interfaces';
import { ArticleRepository, CategoryRepository, TagRepository } from '../repository';
import { v4 as uuid } from 'uuid';
import { Doctor, GetDoctorQuery } from '../../doctors';
import { Admin, GetAdminQuery } from '../../admin';
import { QueryBus } from '@nestjs/cqrs';
import { AuthorType } from '../constants';

@Injectable()
export class ArticleService implements IArticleService {
    constructor(
        @InjectRepository(ArticleRepository)
        private readonly articleRepository: ArticleRepository,
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository,
        @InjectRepository(TagRepository)
        private readonly tagRepository: TagRepository,
        private readonly queryBus: QueryBus
    ) {}

    public async createArticle(
        authorId: string,
        article: Article,
        categoryNames: string[],
        tagNames: string[]
    ): Promise<Article> {
        const [author, authorType] = await this.getAuthor(authorId);

        article.id = uuid();
        article.author = author;
        article.authorType = AuthorType[authorType];

        const [categories] = await this.categoryRepository.getCategories({ names: categoryNames });
        article.categories = categories;
        const [tags] = await this.tagRepository.getTags({ names: tagNames });
        article.tags = tags;

        const existedArticle = await this.articleRepository.save(article);

        return existedArticle;
    }

    private async getAuthor(authorId: string): Promise<[Doctor | Admin, string]> {
        const doctor = await this.queryBus.execute<GetDoctorQuery, Doctor>(new GetDoctorQuery(authorId));

        if (!isNil(doctor)) {
            const authorType = AuthorType.DOCTOR;
            return [doctor, authorType];
        }

        const admin = await this.queryBus.execute<GetAdminQuery, Doctor>(new GetAdminQuery(authorId));

        if (!isNil(admin)) {
            const authorType = AuthorType.DOCTOR;
            return [admin, authorType];
        }
    }

    public async getArticles(
        author?: string,
        title?: string,
        content?: string,
        category?: string,
        tag?: string
    ): Promise<[Article[], number]> {
        const data = await this.articleRepository.getArticles({ title, content, category, tag });

        return data;
    }

    public async updateArticle(
        articleId: string,
        tile: string,
        content: string,
        categoryNames: string[],
        tagNames: string[]
    ): Promise<Article> {
        const exitedArticle = await this.getArticle(articleId);

        if (!isNil(tile)) {
            exitedArticle.title = tile;
        }

        if (!isNil(content)) {
            exitedArticle.content = content;
        }

        if (!isNil(categoryNames)) {
            const [categories] = await this.categoryRepository.getCategories({ names: categoryNames });
            exitedArticle.categories = categories;
        }

        if (!isNil(tagNames)) {
            const [tags] = await this.tagRepository.getTags({ names: tagNames });
            exitedArticle.tags = tags;
        }

        const updateArticle = await this.articleRepository.save(exitedArticle);

        return updateArticle;
    }

    public async deleteArticle(articleId: string): Promise<boolean> {
        await this.getArticle(articleId);

        await this.articleRepository.delete(articleId);

        return true;
    }

    public async getArticle(id: string): Promise<Article> {
        const article = await this.articleRepository.getArticle({ id });

        if (isNil(article)) {
            throw new NotFoundException('This article was not found');
        }

        return article;
    }
}
