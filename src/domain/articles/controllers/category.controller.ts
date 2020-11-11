import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, AuthMode } from '../../../common';
import { CategoryServiceToken } from '../constants';
import { CategoryParamDto, CreateCategoryBodyDto, GetCategoriesQueryDto, UpdateCategoryBodyDto } from '../dto';
import { Category } from '../entities';
import { ICategoryService } from '../interfaces';
import { plainToClass } from 'class-transformer';

interface CategoryResponse {
    data: Category[];
    total: number;
}

@ApiBearerAuth()
@ApiTags('category')
@Controller('/category')
export class CategoryController {
    constructor(
        @Inject(CategoryServiceToken)
        private readonly categoryService: ICategoryService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: Category,
        description: 'Create Category is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    @Post()
    public async createCategory(@Body() bodyDto: CreateCategoryBodyDto): Promise<Category> {
        const data = await this.categoryService.createCategory(plainToClass(Category, bodyDto));

        return data;
    }

    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     type: Category,
    //     description: 'Get Category is successfully'
    // })
    // @HttpCode(HttpStatus.OK)
    // @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    // @Get()
    // public async getCategory(@Param() paramDto: CategoryParamDto): Promise<Category> {
    //     return;
    // }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Category,
        description: 'Get Categories are successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    @Get()
    public async getCategories(@Query() queryDto: GetCategoriesQueryDto): Promise<CategoryResponse> {
        const [data, total] = await this.categoryService.getCategories(queryDto.name);

        return { data, total };
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Category,
        description: 'Update category is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.DOCTOR_GUARD, AuthMode.ADMIN_GUARD])
    @Put('/:categoryId')
    public async updateCategory(
        @Param() paramDto: CategoryParamDto,
        @Body() bodyDto: UpdateCategoryBodyDto
    ): Promise<Category> {
        const data = await this.categoryService.updateCategory(paramDto.categoryId, bodyDto.name);
        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Category,
        description: 'Delete category is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.ADMIN_GUARD])
    @Delete('/:categoryId')
    public async deleteCategory(@Param() paramDto: CategoryParamDto): Promise<boolean> {
        const data = await this.categoryService.deleteCategory(paramDto.categoryId);
        return data;
    }
}
