import { TimeslotService } from '../services';
import { Controller, Inject, Post, Body, Get, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TimeSlotServiceToken } from '../constants';
import { SaveTimeSlotDataQueryDto, TimeSlotIdParamDto, UpdateTimeSlotQueryDto } from '../dto/time-slot';
import { TimeSlot } from '../entities';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { AdminGuard } from '../../../common';

@ApiTags('timeslot')
@Controller('timeslot')
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class TimeSlotController {
    constructor(
        @Inject(TimeSlotServiceToken)
        private readonly timeSlotService: TimeslotService
    ) {}

    @Post('create')
    async createTimeSlot(@Body() timeSlotDto: SaveTimeSlotDataQueryDto): Promise<TimeSlot> {
        return await this.timeSlotService.createTimeSlot(plainToClass(TimeSlot, timeSlotDto));
    }

    @Post()
    async getTimeSlot(@Body() dto: SaveTimeSlotDataQueryDto): Promise<TimeSlot[]> {
        return await this.timeSlotService.getTimeSlot(dto.name);
    }

    @Post('/:id')
    async getTimeSlotById(@Param() dto: TimeSlotIdParamDto): Promise<TimeSlot> {
        return await this.timeSlotService.getTimeSlotById(dto.id);
    }

    @Delete('delete/:id')
    async deleteTimeSlot(@Param() dto: TimeSlotIdParamDto): Promise<DeleteResult> {
        return await this.timeSlotService.deleteTimeSlot(dto.id);
    }

    @Put('update/:id')
    async updateTimeSlot(@Param() paramDto: TimeSlotIdParamDto, @Body() bodyDto: UpdateTimeSlotQueryDto): Promise<TimeSlot> {
        return await this.timeSlotService.updateTimeSlot(paramDto.id, bodyDto);
    }
}
