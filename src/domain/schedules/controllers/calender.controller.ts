import { CalenderService } from '../services';
import { Controller, Inject, Post, Body, Get, Query, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CalenderServiceToken } from '../constants';
import { CalenderIdParamDto, SaveCalenderDataDto, UpdateCalenderBodyDto, SearchCalenderBodyDto } from '../dto';
import { Calender } from '../entities';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { AdminGuard } from '../../../common';

@ApiTags('calender')
@Controller('calender')
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class CalenderController {
    constructor(
        @Inject(CalenderServiceToken)
        private readonly calenderService: CalenderService
    ) {}

    @Post('create')
    async createCalender(@Body() calenderDto: SaveCalenderDataDto): Promise<Calender> {
        return await this.calenderService.createCalender(calenderDto);
    }

    @Post()
    async getCalender(@Body() dto?: SearchCalenderBodyDto): Promise<Calender[]> {
        return await this.calenderService.getCalender(dto.day, dto.timeSlotName);
    }

    @Get('/:id')
    async getCalenderById(@Param() dto: CalenderIdParamDto): Promise<Calender> {
        return await this.calenderService.getCalenderById(dto.id);
    }

    @Delete('delete/:id')
    async deleteCalender(@Param() dto: CalenderIdParamDto): Promise<DeleteResult> {
        return await this.calenderService.deleteCalender(dto.id);
    }

    @Put('update/:id')
    async updateCalender(@Param() paramDto: CalenderIdParamDto, @Body() bodyDto: UpdateCalenderBodyDto): Promise<Calender> {
        return await this.calenderService.updateCalender(paramDto.id, bodyDto);
    }
}
