import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Tag } from '../entities';
import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';

export interface TagQueryOptions {
    id?: string;
    ids?: string[];
    name?: string;
    names?: string[];
}

@Injectable()
@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
    public async getTag(options: TagQueryOptions): Promise<Tag> {
        const queryBuilder = this.createQueryBuilder('Tag')

        this.applyQueryOptions(queryBuilder, options);

        return await queryBuilder.getOne();
    }

    public async getTags(options: TagQueryOptions): Promise<[Tag[], number]> {
        const queryBuilder = this.createQueryBuilder('Tag')

        this.applyQueryOptions(queryBuilder, options);

        queryBuilder.addOrderBy('Tag.updateAt', 'DESC');

        return await queryBuilder.getManyAndCount();
    }

    private applyQueryOptions(
        queryBuilder: SelectQueryBuilder<Tag>,
        options: TagQueryOptions
    ): SelectQueryBuilder<Tag> {
        if (!isNil(options.id)) {
            queryBuilder.andWhere('Tag.id = :id', { id: options.id });
        }

        if (!isNil(options.ids)) {
            queryBuilder.andWhere('Tag.id IN (:...ids)', { ids: options.ids });
        }

        if (!isNil(options.name)) {
            queryBuilder.andWhere('Tag.name LIKE :name', { name: `${options.name}` });
        }

        if (!isNil(options.names)) {
            queryBuilder.andWhere('Tag.name IN (:...names)', { names: options.names });
        }

        return queryBuilder;
    }
}
