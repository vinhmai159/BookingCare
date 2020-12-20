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
import { DoctorGuard, jwt, AdminGuard, Auth, AuthMode } from '../../../common';
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
    @Auth([AuthMode.ADMIN_GUARD])
    @Post('/create')
    async createDoctor(@Body() doctorDto: CreateDoctorQueryDto): Promise<Doctor> {
        return await this.doctorService.createDoctor(
            plainToClass(Doctor, doctorDto),
            null,
            doctorDto.expertiseId,
            doctorDto.hospitalId
        );
    }

    @Get('/public/:id')
    async getDoctorByIdForAdmin(@Param() dto: IdDoctorParamDto): Promise<Doctor> {
        return await this.doctorService.getDoctorById(dto.id);
    }

    @ApiBearerAuth()
    @Auth([AuthMode.DOCTOR_GUARD])
    @Get('/account')
    async getDoctorById(@jwt() doctor: Doctor): Promise<Doctor> {
        return await this.doctorService.getDoctorById(doctor.id);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @Get()
    async getDoctors(@Query() dto: GetDoctorQueryDto): Promise<Doctor[]> {
        return await this.doctorService.getDoctors(dto.name, dto.expertise, dto.hospital);
    }

    @ApiBearerAuth()
    @Auth([AuthMode.DOCTOR_GUARD])
    @Put('/update')
    async updateDoctor(@jwt() doctor: Doctor, @Body() bodyDto: UpdateDoctorQueryDto): Promise<Doctor> {
        return await this.doctorService.updateDoctor(doctor.id, plainToClass(Doctor, bodyDto));
    }

    @ApiBearerAuth()
    @Auth([AuthMode.ADMIN_GUARD])
    @Put('/admin/:id/update')
    async updateDoctorForAdmin(
        @Param() paramDto: IdDoctorParamDto,
        @Body() bodyDto: UpdateDoctorQueryDto
    ): Promise<Doctor> {
        return await this.doctorService.updateDoctor(paramDto.id, plainToClass(Doctor, bodyDto), bodyDto.expertiseId, bodyDto.hospitalId);
    }

    @ApiBearerAuth()
    @Auth([AuthMode.ADMIN_GUARD])
    @Delete('/:id/delete')
    async deleteDoctor(@Param() dto: IdDoctorParamDto): Promise<DeleteResult> {
        return await this.doctorService.deleteDoctor(dto.id);
    }

    @ApiBearerAuth()
    @Auth([AuthMode.DOCTOR_GUARD])
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
