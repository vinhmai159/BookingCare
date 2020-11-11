import { Tag } from '../entities';

export interface ITagService {
    createTag(tag: Tag): Tag | Promise<Tag>;

    // getTag(tagId: string): Tag | Promise<Tag>;

    getTags(
        name?: string
    ): [Tag[], number] | Promise<[Tag[], number]>;

    updateTag(tagId: string, name: string): Tag | Promise<Tag>;

    deleteTag(tagId: string): boolean | Promise<boolean>;
}
