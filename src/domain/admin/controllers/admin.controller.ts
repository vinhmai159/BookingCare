import { Controller, Inject, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminServiceToken } from '../contants';
import { IAdminService } from '../interfaces';
import {AdminBodyDto, AdminLogInDto, IdAdminParamDto, CreateAdminBodyDto} from '../dto';
import { Admin } from '../entities';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';

@Controller('api/admin')
@ApiTags('Admin')
export class AdminController {
    constructor(
        @Inject(AdminServiceToken)
        private readonly adminService: IAdminService
    ) {}

    @Post('create')
    public async createAdmin(@Body() bodyDto: CreateAdminBodyDto): Promise<Admin> {
        return await this.adminService.createAdmin(plainToClass(Admin, bodyDto));
    }

    @Post('login')
    public async adminLogin(@Body() bodyDto: AdminLogInDto): Promise<{accessToken: string}> {
        return await this.adminService.adminLogin(bodyDto.userName, bodyDto.password);
    }

    @Post()
    public async getAdmins(@Body() bodyDto: AdminBodyDto): Promise<[Admin[], number]> {
        return await this.adminService.getAdmins(bodyDto.name);
    }

    @Delete('/:id/delete')
    public async deleteAdmin(@Param() paramDto: IdAdminParamDto): Promise<DeleteResult> {
        return await this.adminService.deleteAdmin(paramDto.id);
    }

    @Put('/:id/update')
    public async updateAdmin(@Param() paramDto: IdAdminParamDto,@Body() bodyDto: AdminBodyDto): Promise<Admin> {
        return await this.adminService.updateAdmin(paramDto.id, plainToClass(Admin, bodyDto));
    }
}
