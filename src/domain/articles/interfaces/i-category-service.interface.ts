import { Category } from '../entities';

export interface ICategoryService {
    createCategory(category: Category): Category | Promise<Category>;

    // getCategory(categoryId: string): Category | Promise<Category>;

    getCategories(
        name?: string
    ): [Category[], number] | Promise<[Category[], number]>;

    updateCategory(categoryId: string, name: string): Category | Promise<Category>;

    deleteCategory(categoryId: string): boolean | Promise<boolean>;
}
