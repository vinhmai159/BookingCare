import {TimeslotService} from '../services';
import {Controller, Inject, Post, Body, Get, Query, Param} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimeSlotServiceToken } from '../constants';
import {SaveTimeSlotDataQueryDto, TimeSlotIdParamDto, UpdateTimeSlotQueryDto} from '../dto/time-slot';
import {TimeSlot} from '../entities';
import {plainToClass} from 'class-transformer';
import { DeleteResult } from 'typeorm';

@ApiTags('timeslot')
@Controller('timeslot')
export class TimeSlotController {
    constructor (
        @Inject(TimeSlotServiceToken)
        private readonly timeSlotService: TimeslotService,
    ) {}

    @Post('create')
    async createTimeSlot(@Query() timeSlotDto: SaveTimeSlotDataQueryDto): Promise<TimeSlot> {
        return await this.timeSlotService.createTimeSlot(plainToClass(TimeSlot, timeSlotDto))
    }

    @Post()
    async getTimeSlot(@Body() dto : SaveTimeSlotDataQueryDto): Promise<TimeSlot[]> {
        return await this.timeSlotService.getTimeSlot(dto.name);
    }

    @Post('/:id')
    async getTimeSlotById(@Param() dto : TimeSlotIdParamDto): Promise<TimeSlot> {
        return await this.timeSlotService.getTimeSlotById(dto.id);
    }

    @Post('delete/:id')
    async deleteTimeSlot(@Query() dto : TimeSlotIdParamDto): Promise<DeleteResult> {
        return await this.timeSlotService.deleteTimeSlot(dto.id);
    }

    @Post('update/:id')
    async updateTimeSlot(@Query() dto : UpdateTimeSlotQueryDto): Promise<TimeSlot> {
        return await this.timeSlotService.updateTimeSlot(plainToClass(TimeSlot, dto));
    }
}