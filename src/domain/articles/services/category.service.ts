import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { Category } from '../entities';
import { ICategoryService } from '../interfaces';
import { CategoryRepository } from '../repository';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository
    ) {}

    public async createCategory(category: Category): Promise<Category> {
        await this.ensureNoExitedCategory(category.name);

        category.id = uuid();

        await this.categoryRepository.save(category);

        return await this.ensureExitedCategory(null, category.name);
    }

    public async getCategories(name?: string): Promise<[Category[], number]> {
        const data = await this.categoryRepository.getCategories({ name });

        return data;
    }

    public async updateCategory(categoryId: string, name: string): Promise<Category> {
        const exitedCategory = await this.ensureExitedCategory(categoryId);

        exitedCategory.name = name;

        await this.categoryRepository.save(exitedCategory);

        return exitedCategory;
    }

    public async deleteCategory(categoryId: string): Promise<boolean> {
        await this.ensureExitedCategory(categoryId);

        await this.categoryRepository.delete(categoryId);

        return true;
    }

    private async ensureNoExitedCategory(name: string): Promise<void> {
        const category = await this.categoryRepository.getCategory({ name });

        if (!isNil(category)) {
            throw new BadRequestException('This category already exists');
        }
    }

    private async ensureExitedCategory(id?: string, name?: string): Promise<Category> {
        const category = await this.categoryRepository.getCategory({ id, name });

        if (isNil(category)) {
            throw new NotFoundException('This category was not found');
        }

        return category;
    }
}
