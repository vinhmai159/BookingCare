import { Article } from '../entities';

export interface IArticleService {
    createArticle(
        authorId: string,
        article: Article,
        categoryNames: string[],
        tagNames: string[]
    ): Article | Promise<Article>;

    getArticle(articleId: string): Article | Promise<Article>;

    getArticles(
        authorId?: string,
        keyword?: string
    ): [Article[], number] | Promise<[Article[], number]>;

    updateArticle(
        articleId: string,
        tile: string,
        content: string,
        categoryNames: string[],
        tagNames: string[]
    ): Article | Promise<Article>;

    deleteArticle(articleId: string, doctorId?: string): boolean | Promise<boolean>;
}
