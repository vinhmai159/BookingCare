import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Article } from '../entities';
import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';

export interface ArticleQueryOptions {
    id?: string;
    ids?: string[];

    author?: string;

    title?: string;
    content?: string;

    categoryId?: string;
    tagId?: string;

    category?: string;
    tag?: string;
}

@Injectable()
@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
    public async getArticle(options: ArticleQueryOptions): Promise<Article> {
        const queryBuilder = this.createQueryBuilder('Article')
            .leftJoinAndSelect('Article.categories', 'Category')
            .leftJoinAndSelect('Article.tags', 'Tag');

        this.applyQueryOptions(queryBuilder, options);

        return await queryBuilder.getOne();
    }

    public async getArticles(options: ArticleQueryOptions): Promise<[Article[], number]> {
        const queryBuilder = this.createQueryBuilder('Article')
        .leftJoinAndSelect('Article.categories', 'Category')
        .leftJoinAndSelect('Article.tags', 'Tag');

        this.applyQueryOptions(queryBuilder, options);

        queryBuilder.addOrderBy('Article.updateAt', 'DESC');

        return await queryBuilder.getManyAndCount();
    }

    private applyQueryOptions(
        queryBuilder: SelectQueryBuilder<Article>,
        options: ArticleQueryOptions
    ): SelectQueryBuilder<Article> {
        if (!isNil(options.id)) {
            queryBuilder.andWhere('Article.id = :id', { id: options.id });
        }

        if (!isNil(options.ids)) {
            queryBuilder.andWhere('Article.id IN (:...ids)', { ids: options.ids });
        }

        if (!isNil(options.title)) {
            queryBuilder.andWhere('Article.title LIKE :title', { title: `${options.title}` });
        }

        if (!isNil(options.content)) {
            queryBuilder.andWhere('Article.content LIKE :content', { content: `${options.content}` });
        }

        if (!isNil(options.category)) {
            queryBuilder.andWhere('Category.name LIKE :category', { category: `${options.category}` });
        }

        if (!isNil(options.tag)) {
            queryBuilder.andWhere('Tag.name LIKE :tag', { tag: `${options.tag}` });
        }

        if (!isNil(options.categoryId)) {
            queryBuilder.andWhere('Category.id = :categoryId', { categoryId: options.categoryId });
        }

        if (!isNil(options.tagId)) {
            queryBuilder.andWhere('Tag.id = :tagId', { tagId: options.tagId });
        }

        return queryBuilder;
    }
}
