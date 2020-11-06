import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { Auth, AuthMode, jwt } from '../../../common';
import { Schedule } from '../../schedules';
import { UserServiceToken } from '../contants';
import {
    BookingScheduleBodyDto,
    CreateUserBodyDto,
    GetUserBodyDto,
    IdUserParamDto,
    UpdateUserBodyDto,
    UserLogInBodyDto
} from '../dto';
import { User } from '../entities';
import { IUserService } from '../interfaces';

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
    @Auth([AuthMode.ADMIN_GUARD])
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
    @Auth([AuthMode.USER_GUARD])
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
    @Auth([AuthMode.ADMIN_GUARD])
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
    @Auth([AuthMode.USER_GUARD])
    @HttpCode(HttpStatus.OK)
    @Put('/:id/update')
    public async updateUser(@jwt() user: User, @Body() bodyDto: UpdateUserBodyDto): Promise<User> {
        const exitUser = await this.userService.updateUser(user.id, plainToClass(User, bodyDto));
        return exitUser;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        // type: ,
        description: 'Update a user is successfully'
    })
    @ApiBearerAuth()
    @Auth([AuthMode.ADMIN_GUARD])
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
    @Auth([AuthMode.ADMIN_GUARD])
    @HttpCode(HttpStatus.OK)
    @Delete('/:id/delete')
    public async deleteUser(@Param() paramDto: IdUserParamDto): Promise<DeleteResult> {
        return await this.userService.deleteUser(paramDto.id);
    }

    @ApiBearerAuth()
    @Auth([AuthMode.USER_GUARD])
    @Post('/booking-schedule')
    public async bookingSchedule(@jwt() user: User, @Body() bodyDto: BookingScheduleBodyDto): Promise<Schedule> {
        const data = await this.userService.bookingSchedule(user.id, bodyDto.scheduleId);
        return data;
    }
}
