import {CalenderService} from '../services';
import {Controller, Inject, Post, Body, Get, Query, Param} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CalenderServiceToken } from '../constants';
import {
    CalenderIdParamDto,
    SaveCalenderDataDto,
    UpdateCalenderBodyDto,
    SearchCalenderBodyDto
} from '../dto';
import {Calender} from '../entities';
import {plainToClass} from 'class-transformer';
import { DeleteResult } from 'typeorm';

@ApiTags('calender')
@Controller('calender')
export class CalenderController {
    constructor (
        @Inject(CalenderServiceToken)
        private readonly calenderService: CalenderService,
    ) {}

    @Post('create')
    async createCalender(@Query() calenderDto: SaveCalenderDataDto): Promise<Calender> {
        return await this.calenderService.createCalender(calenderDto)
    }

    @Post()
    async getCalender(@Body() dto : SearchCalenderBodyDto): Promise<Calender[]> {
        return await this.calenderService.getCalender(dto.day, dto.timeSlotName);
    }

    @Post('/:id')
    async getCalenderById(@Param() dto : CalenderIdParamDto): Promise<Calender> {
        return await this.calenderService.getCalenderById(dto.id);
    }

    @Post('delete/:id')
    async deleteCalender(@Query() dto : CalenderIdParamDto): Promise<DeleteResult> {
        return await this.calenderService.deleteCalender(dto.id);
    }

    @Post('update/:id')
    async updateCalender(@Query() dto : UpdateCalenderBodyDto): Promise<Calender> {
        return await this.calenderService.updateCalender(dto);
    }
}