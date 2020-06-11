import { Controller, Post, Body, Get, Param, Put, Delete, Inject, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IDoctorService } from '../interfaces/I-Doctor.interface';
import { CreateDoctorQueryDto, GetDoctorQueryDto, UpdateDoctorQueryDto, IdDoctorParamDto, DoctorLogInDto } from '../dto';
import { plainToClass } from 'class-transformer';
import { Doctor } from '../entities';
import { DeleteResult } from 'typeorm';
import { DoctorServiceToken } from '../constants';
import {AuthGuard} from '../../../common';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
    constructor(
        @Inject(DoctorServiceToken)
        private readonly doctorService: IDoctorService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @Post('login')
    async login(@Query() loginDto: DoctorLogInDto): Promise<{ accessToken: string}> {
      return await this.doctorService.doctorLogin(loginDto.email, loginDto.password);
    }

    @Post('/create')
    async createDoctor(@Body() doctorDto: CreateDoctorQueryDto): Promise<Doctor> {
        return await this.doctorService.createDoctor(plainToClass(Doctor, doctorDto));
    }

    @Get('/:id')
    async getDoctorById(@Param() dto: IdDoctorParamDto): Promise<Doctor> {
        return await this.doctorService.getDoctorById(dto.id);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @Post()
    async getDoctors(@Body() dto: GetDoctorQueryDto): Promise<Doctor[]> {
        return await this.doctorService.getDoctors(dto.name);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('/:id/update')
    async updateDoctor(@Body() updateDoctorDto: UpdateDoctorQueryDto): Promise<Doctor> {
        return await this.doctorService.updateDoctor(plainToClass(Doctor, updateDoctorDto));
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':/id/delete')
    async deleteDoctor(@Param() dto: IdDoctorParamDto): Promise<DeleteResult> {
        return await this.doctorService.deleteDoctor(dto.id);
    }
}
