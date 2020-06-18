import { Controller, Inject, Post, HttpStatus, HttpCode, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {IUserService} from '../interfaces';
import { UserServiceToken } from '../contants';
import {User} from '../entities';
import { DeleteResult } from 'typeorm';
import {CreateUserBodyDto, GetUserBodyDto, IdUserParamDto, UpdateUserBodyDto} from '../dto';
import { plainToClass } from 'class-transformer';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor (
        @Inject(UserServiceToken)
        private readonly userService: IUserService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Create one user is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Post('create')
    public async createUser(@Body() bodyDto: CreateUserBodyDto): Promise<User>{
        const user = await this.userService.createUser(plainToClass(User, bodyDto));
        return user;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Get users is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Post()
    public async getUsers(@Body() bodydto: GetUserBodyDto): Promise<any>{
        const [data, count] = await this.userService.getUsers(
            bodydto.name,
            bodydto.email,
            bodydto.address
        )
        return {data, count};
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Get a user is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Post('/:id')
    public async getUserById(@Param() paramDto: IdUserParamDto): Promise<User>{
        const user = await this.userService.getUserById(paramDto.id);
        return user;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Update a user is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Post('/:id/update')
    public async updateUser(@Param() paramDto: IdUserParamDto, @Body() bodyDto: UpdateUserBodyDto): Promise<User>{
        const user = await this.userService.updateUser(paramDto.id, plainToClass(User, bodyDto));
        return user;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Delete a user is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Post('/:id/delete')
    public async deleteUser(@Param() paramDto: IdUserParamDto): Promise<DeleteResult>{
        return await this.userService.deleteUser(paramDto.id);
    }
}
