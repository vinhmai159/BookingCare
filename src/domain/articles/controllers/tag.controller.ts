import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, AuthMode } from '../../../common';
import { TagServiceToken } from '../constants';
import { CreateTagBodyDto, GetTagsQueryDto, TagParamDto, UpdateTagBodyDto } from '../dto';
import { Tag } from '../entities';
import { ITagService } from '../interfaces';
import { plainToClass } from 'class-transformer';

interface TagResponse {
    data: Tag[];
    total: number;
}

@ApiBearerAuth()
@ApiTags('tag')
@Controller('/tag')
export class TagController {
    constructor(
        @Inject(TagServiceToken)
        private readonly tagService: ITagService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: Tag,
        description: 'Create Tag is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    @Post()
    public async createTag(@Body() bodyDto: CreateTagBodyDto): Promise<Tag> {
        const data = await this.tagService.createTag(plainToClass(Tag, bodyDto));

        return data;
    }

    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     type: Tag,
    //     description: 'Get Tag is successfully'
    // })
    // @HttpCode(HttpStatus.OK)
    // @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    // @Get()
    // public async getTag(@Param() paramDto: TagParamDto): Promise<Tag> {
    //     return;
    // }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Tag,
        description: 'Get Categories are successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    @Get()
    public async getTags(@Query() queryDto: GetTagsQueryDto): Promise<TagResponse> {
        const [data, total] = await this.tagService.getTags(queryDto.name);

        return { data, total };
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Tag,
        description: 'Update tag is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    @Put('/:tagId')
    public async updateTag(@Param() paramDto: TagParamDto, @Body() bodyDto: UpdateTagBodyDto): Promise<Tag> {
        const data = await this.tagService.updateTag(paramDto.tagId, bodyDto.name);

        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Tag,
        description: 'Delete tag is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.ADMIN_GUARD])
    @Delete('/:tagId')
    public async deleteTag(@Param() paramDto: TagParamDto): Promise<boolean> {
        const data = await this.tagService.deleteTag(paramDto.tagId);

        return data;
    }
}
