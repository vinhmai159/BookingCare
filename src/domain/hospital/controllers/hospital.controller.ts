import { Controller, Inject, HttpStatus, Post, Body, Param, Put, Delete, UseGuards, Get, Query } from '@nestjs/common';
import { IHospitalService } from '../interfaces';
import { HospitalServiceToken } from '../contants';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Hospital } from '../entities';
import { CreateHospitalBodyDto, GetHospitalQueryDto, HospitalParamDto, UpdateHospitalBodyDto } from '../dto';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { AdminGuard } from '../../../common';

@ApiTags('hospital')
@Controller('/hospital')
export class HospitalController {
    constructor(
        @Inject(HospitalServiceToken)
        private readonly hospitalService: IHospitalService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post('create')
    async createHospital(@Body() bodyDto: CreateHospitalBodyDto): Promise<Hospital> {
        return await this.hospitalService.createHospital(plainToClass(Hospital, bodyDto));
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @Get()
    async getHospitals(@Query() queryDto?: GetHospitalQueryDto): Promise<[Hospital[], number]> {
        return await this.hospitalService.getHospitals(queryDto.name);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Delete('/:hospitalId')
    async deleteHospital(@Param() paramDto: HospitalParamDto): Promise<DeleteResult> {
        return await this.hospitalService.deleteHospital(paramDto.hospitalId);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Put('/:hospitalId')
    async updateHospital(
        @Param() paramDto: HospitalParamDto,
        @Body() bodyDto: UpdateHospitalBodyDto
    ): Promise<Hospital> {
        return await this.hospitalService.updateHospital(paramDto.hospitalId, plainToClass(Hospital, bodyDto));
    }
}
