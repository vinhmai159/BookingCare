import { Controller, Inject, Post, HttpStatus, HttpCode, Body, Param, UseGuards, Delete, Put, Get } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IUserService } from '../interfaces';
import { UserServiceToken } from '../contants';
import { User } from '../entities';
import { DeleteResult } from 'typeorm';
import {
    CreateUserBodyDto,
    GetUserBodyDto,
    IdUserParamDto,
    UpdateUserBodyDto,
    UserLogInBodyDto,
    BookingScheduleBodyDto
} from '../dto';
import { plainToClass } from 'class-transformer';
import { Schedule } from '../../schedules';
import { UserGuard, jwt, AdminGuard } from '../../../common';
import { isNullOrUndefined } from 'util'

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        @Inject(UserServiceToken)
        private readonly userService: IUserService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @Post('login')
    async login(@Body() loginDto: UserLogInBodyDto): Promise<{ accessToken: string }> {
        return await this.userService.userLogin(loginDto.email, loginDto.password);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Create one user is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post('create')
    public async createUser(@Body() bodyDto: CreateUserBodyDto): Promise<User> {
        const user = await this.userService.createUser(plainToClass(User, bodyDto));
        return user;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Get users is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post()
    public async getUsers(@Body() bodydto?: GetUserBodyDto): Promise<any> {
        const [data, count] = await this.userService.getUsers(bodydto.name, bodydto.email, bodydto.address);
        return { data, count };
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Get a user is successfully'
    })
    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.OK)
    @Get('get-user-by-id')
    public async getUserById(@jwt() user: User): Promise<User> {
        const exitUser = await this.userService.getUserById(user.id);
        return exitUser;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Get a user is successfully'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.OK)
    @Get('/admin/:id/get-user-by-id')
    public async getUserByIdForAdmin(@Param() paramDto: IdUserParamDto): Promise<User> {
        const exitUser = await this.userService.getUserById(paramDto.id);
        return exitUser;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Update a user is successfully'
    })
    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.OK)
    @Put('/:id/update')
    public async updateUser(
        @jwt() user: User,
        @Body() bodyDto: UpdateUserBodyDto
    ): Promise<User> {
        const exitUser = await this.userService.updateUser(user.id, plainToClass(User, bodyDto));
        return exitUser;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Update a user is successfully'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.OK)
    @Put('admin/:id/update')
    public async updateUserForAdmin(
        @Param() paramDto: IdUserParamDto,
        @Body() bodyDto: UpdateUserBodyDto
    ): Promise<User> {
        const exitUser = await this.userService.updateUser(paramDto.id, plainToClass(User, bodyDto));
        return exitUser;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Delete a user is successfully'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('/:id/delete')
    public async deleteUser(@Param() paramDto: IdUserParamDto): Promise<DeleteResult> {
        return await this.userService.deleteUser(paramDto.id);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Post('/booking-schedule')
    public async bookingSchedule(@jwt() user: User, @Body() bodyDto: BookingScheduleBodyDto): Promise<Schedule> {
        const data = await this.userService.bookingSchedule(user.id, bodyDto.scheduleId);
        return data;
    }
}
