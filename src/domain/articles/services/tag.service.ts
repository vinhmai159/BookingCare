import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { Tag } from '../entities';
import { ITagService } from '../interfaces';
import { TagRepository } from '../repository';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TagService implements ITagService {
    constructor(
        @InjectRepository(TagRepository)
        private readonly tagRepository: TagRepository
    ) {}

    public async createTag(tag: Tag): Promise<Tag> {
        await this.ensureNoExitedTag(tag.name);

        tag.id = uuid();

        await this.tagRepository.save(tag);

        return await this.ensureExitedTag(null, tag.name);
    }

    public async getTags(name?: string): Promise<[Tag[], number]> {
        const data = await this.tagRepository.getTags({ name });

        return data;
    }

    public async updateTag(tagId: string, name: string): Promise<Tag> {
        const exitedTag = await this.ensureExitedTag(tagId);

        exitedTag.name = name;

        await this.tagRepository.save(exitedTag);

        return exitedTag;
    }

    public async deleteTag(tagId: string): Promise<boolean> {
        await this.ensureExitedTag(tagId);

        await this.tagRepository.delete(tagId);

        return true;
    }

    private async ensureNoExitedTag(name: string): Promise<void> {
        const tag = await this.tagRepository.getTag({ name });

        if (!isNil(tag)) {
            throw new BadRequestException('This tag already exists');
        }
    }

    private async ensureExitedTag(id?: string, name?: string): Promise<Tag> {
        const tag = await this.tagRepository.getTag({ id, name });

        if (isNil(tag)) {
            throw new NotFoundException('This tag was not found');
        }

        return tag;
    }
}
