import { EntityRepository, Repository, SelectQueryBuilder, DeleteResult } from 'typeorm';
import { Category } from '../entities';
import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';

export interface CategoryQueryOptions {
    id?: string;
    ids?: string[];
    name?: string;
    names?: string[];
}

@Injectable()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    public async getCategory(options: CategoryQueryOptions): Promise<Category> {
        const queryBuilder = this.createQueryBuilder('Category');

        this.applyQueryOptions(queryBuilder, options);

        return await queryBuilder.getOne();
    }

    public async getCategories(options: CategoryQueryOptions): Promise<[Category[], number]> {
        const queryBuilder = this.createQueryBuilder('Category');

        this.applyQueryOptions(queryBuilder, options);

        queryBuilder.addOrderBy('category.updateAt', 'DESC');

        return await queryBuilder.getManyAndCount();
    }

    private applyQueryOptions(
        queryBuilder: SelectQueryBuilder<Category>,
        options: CategoryQueryOptions
    ): SelectQueryBuilder<Category> {
        if (!isNil(options.id)) {
            queryBuilder.andWhere('Category.id = :id', { id: options.id });
        }

        if (!isNil(options.ids)) {
            queryBuilder.andWhere('Category.id IN (:...ids)', { ids: options.ids });
        }

        if (!isNil(options.name)) {
            queryBuilder.andWhere('Category.name LIKE :name', { name: `${options.name}` });
        }

        if (!isNil(options.names)) {
            queryBuilder.andWhere('Category.name IN (:...names)', { names: options.names });
        }

        return queryBuilder;
    }
}
