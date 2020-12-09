import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { v4 as uuid } from 'uuid';
import { Doctor, GetDoctorQuery } from '../../doctors';
import { Article } from '../entities';
import { IArticleService } from '../interfaces';
import { ArticleRepository, CategoryRepository, TagRepository } from '../repository';

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
        const author = await this.getAuthor(authorId);

        article.id = uuid();
        article.doctor = author;

        const [categories] = await this.categoryRepository.getCategories({ names: categoryNames });
        article.categories = categories;
        const [tags] = await this.tagRepository.getTags({ names: tagNames });
        article.tags = tags;

        const existedArticle = await this.articleRepository.save(article);

        return existedArticle;
    }

    private async getAuthor(authorId: string): Promise<Doctor> {
        const doctor = await this.queryBus.execute<GetDoctorQuery, Doctor>(new GetDoctorQuery(authorId));

        if (isNil(doctor)) {
            throw new NotFoundException('This author invalid!');
        }

        return doctor;
    }

    public async getArticles(
        authorId?: string,
        keyword?: string
    ): Promise<[Article[], number]> {
        const data = await this.articleRepository.getArticles({ keyword, authorId });

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

    public async deleteArticle(articleId: string, doctorId?: string): Promise<boolean> {
        await this.getArticle(articleId, doctorId);

        await this.articleRepository.delete(articleId);

        return true;
    }

    public async getArticle(id: string, authorId?: string): Promise<Article> {
        const article = await this.articleRepository.getArticle({ id, authorId });

        if (isNil(article)) {
            throw new NotFoundException('This article was not found');
        }

        return article;
    }
}
