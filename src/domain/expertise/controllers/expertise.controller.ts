import { Controller, Inject, HttpStatus, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { IExpertiseService } from '../interfaces';
import { ExpertiseServiceToken } from '../contants';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Expertise } from '../entities';
import { CreateExpertiseBodyDto, GetExpertiseBodyDto, IdExpertiseParamDto } from '../dto';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { AdminGuard } from '../../../common';

@ApiTags('expertise')
@Controller('expertise')
export class ExpertiseController {
    constructor(
        @Inject(ExpertiseServiceToken)
        private readonly expertiseService: IExpertiseService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post('create')
    async createExpertise(@Body() bodyDto: CreateExpertiseBodyDto): Promise<Expertise> {
        return await this.expertiseService.createExpertise(plainToClass(Expertise, bodyDto));
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @Post()
    async getExpertises(@Body() bodyDto?: GetExpertiseBodyDto): Promise<[Expertise[], number]> {
        return await this.expertiseService.getExpertises(bodyDto.name);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Delete('/:id/delete')
    async deleteExpertise(@Param() paramDto: IdExpertiseParamDto): Promise<DeleteResult> {
        return await this.expertiseService.deleteExpertise(paramDto.id);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @Put('/:id/update')
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    async updateExpertise(
        @Param() paramDto: IdExpertiseParamDto,
        @Body() bodyDto: CreateExpertiseBodyDto
    ): Promise<Expertise> {
        return await this.expertiseService.upateExpertise(paramDto.id, bodyDto.name);
    }
}
