import { Controller, Inject, HttpStatus, Post, Body, Param } from '@nestjs/common';
import {IExpertiseService} from '../interfaces';
import {ExpertiseServiceToken} from '../contants';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {Expertise} from '../entities';
import {CreateExpertiseBodyDto, GetExpertiseBodyDto, IdExpertiseParamDto} from '../dto';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';

@ApiTags('expertise')
@Controller('expertise')
export class ExpertiseController {
    constructor (
        @Inject(ExpertiseServiceToken)
        private readonly expertiseService: IExpertiseService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
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
    @Post('/:id/delete')
    async deleteExpertise(@Param() paramDto: IdExpertiseParamDto): Promise<DeleteResult> {
        return await this.expertiseService.deleteExpertise(paramDto.id);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The request is successfully.'
    })
    @Post('/:id/update')
    async updateExpertise(@Param() paramDto: IdExpertiseParamDto, @Body() bodyDto: CreateExpertiseBodyDto): Promise<Expertise> {
        return await this.expertiseService.upateExpertise(paramDto.id, bodyDto.name);
    }
}
