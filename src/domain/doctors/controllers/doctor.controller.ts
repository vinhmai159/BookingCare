import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import {ApiTags, ApiParam, ApiBody, ApiResponse} from '@nestjs/swagger';
import { IDoctorService } from '../interfaces/I-Doctor.interface';
import {
  CreateDoctorQueryDto,
  GetDoctorQueryDto,
  UpdateDoctorQueryDto,
  IdDoctorParamDto
} from '../dto';
import { plainToClass } from 'class-transformer';
import { Doctor } from '../entities';
import { DeleteResult } from 'typeorm';
import { DoctorServiceToken } from '../constants';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(
    @Inject(DoctorServiceToken)
    private readonly doctorService: IDoctorService,
  ) {}

  @Post('/create')
  async createDoctor(@Body() doctorDto: CreateDoctorQueryDto): Promise<Doctor> {
    return await this.doctorService.createDoctor(
      plainToClass(Doctor, doctorDto),
    );
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

  @Put('/:id/update')
  async updateDoctor(@Body() updateDoctorDto: UpdateDoctorQueryDto): Promise<Doctor> {
    return await this.doctorService.updateDoctor(
      plainToClass(Doctor, updateDoctorDto),
    );
  }

  @Delete(':/id/delete')
  async deleteDoctor(@Param() dto: IdDoctorParamDto): Promise<DeleteResult> {
    return await this.doctorService.deleteDoctor(dto.id);
  }
}
