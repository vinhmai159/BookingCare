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
    Query,
    UseGuards,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiParam, ApiBody, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { IDoctorService } from '../interfaces/I-Doctor.interface';
import {
    CreateDoctorQueryDto,
    GetDoctorQueryDto,
    UpdateDoctorQueryDto,
    IdDoctorParamDto,
    DoctorLogInDto,
    FileUploadDto
} from '../dto';
import { plainToClass } from 'class-transformer';
import { Doctor } from '../entities';
import { DeleteResult } from 'typeorm';
import { DoctorServiceToken } from '../constants';
import { DoctorGuard, jwt, AdminGuard } from '../../../common';
import { extname } from 'path';

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
    async login(@Body() loginDto: DoctorLogInDto): Promise<{ accessToken: string }> {
        return await this.doctorService.doctorLogin(loginDto.email, loginDto.password);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post('/create')
    async createDoctor(@Body() doctorDto: CreateDoctorQueryDto): Promise<Doctor> {
        return await this.doctorService.createDoctor(plainToClass(Doctor, doctorDto), null);
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Get('/admin/:id')
    async getDoctorByIdForAdmin(@Param() dto: IdDoctorParamDto): Promise<Doctor> {
        return await this.doctorService.getDoctorById(dto.id);
    }

    @ApiBearerAuth()
    @UseGuards(DoctorGuard)
    @Get('/:id')
    async getDoctorById(@jwt() doctor: Doctor): Promise<Doctor> {
        return await this.doctorService.getDoctorById(doctor.id);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post()
    async getDoctors(@Body() dto: GetDoctorQueryDto): Promise<Doctor[]> {
        return await this.doctorService.getDoctors(dto.name, dto.expertise);
    }

    @ApiBearerAuth()
    @UseGuards(DoctorGuard)
    @Put('/update')
    async updateDoctor(@jwt() doctor: Doctor, @Body() updateDoctorDto: UpdateDoctorQueryDto): Promise<Doctor> {
        return await this.doctorService.updateDoctor(doctor.id, updateDoctorDto);
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Put('/admin/:id/update')
    async updateDoctorForAdmin(
        @Param() paramDto: IdDoctorParamDto,
        @Body() updateDoctorDto: UpdateDoctorQueryDto
    ): Promise<Doctor> {
        return await this.doctorService.updateDoctor(paramDto.id, updateDoctorDto);
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Delete(':/id/delete')
    async deleteDoctor(@Param() dto: IdDoctorParamDto): Promise<DeleteResult> {
        return await this.doctorService.deleteDoctor(dto.id);
    }

    @ApiBearerAuth()
    @UseGuards(DoctorGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: 'public/images',
                filename: (req, file, cb) => {
                    cb(null, `${Date.now()}${extname(file.originalname)}`);
                }
            })
        })
    )
    @ApiBody({
        description: 'Upload the Avatar.',
        type: FileUploadDto
    })
    @Post('uploadAvatar')
    async uploadAvatar(@jwt() doctor: Doctor, @UploadedFile() file) {
        doctor.avatar = file.path;
        return await this.doctorService.saveDoctor(doctor);
    }
}
