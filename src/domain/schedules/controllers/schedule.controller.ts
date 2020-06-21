import { Controller, Post, Inject, Query, Body, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ScheduleService } from '../services';
import { Schedule } from '../entities';
import {
    CreateScheduleQueryDto,
    GetScheduleByDoctorQueryDto,
    CreateOneSchedulesQueryDto,
    ScheduleByDoctor
} from '../dto';
import { ScheduleServiceToken } from '../constants';
import { IScheduleService } from '../interfaces';
import { AuthGuard, jwt } from '../../../common';
import { Doctor } from '../../doctors';
import { DeleteResult } from 'typeorm';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
    constructor(
        @Inject(ScheduleServiceToken)
        private readonly scheduleService: IScheduleService
    ) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('create-many')
    async createSchedules(@jwt() doctor: Doctor, @Body() dto: CreateScheduleQueryDto): Promise<Schedule[]> {
        return await this.scheduleService.createSchedule(doctor, dto.calenderIds);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('create-one')
    async createSchedule(@jwt() doctor: Doctor, @Body() dto: CreateOneSchedulesQueryDto): Promise<Schedule> {
        return await this.scheduleService.createOneSchedule(doctor, dto.calenderId);
    }

    @Post(':doctorId')
    async getScheduleByDoctor(@Body() dto: GetScheduleByDoctorQueryDto): Promise<ScheduleByDoctor[]> {
        return await this.scheduleService.getSchedulesByDoctor(dto.doctorId, dto.day);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('delete/:doctorId/:calenderIds')
    async deleteSchedules(@jwt() doctor: Doctor, @Body() dto: CreateScheduleQueryDto): Promise<DeleteResult> {
        return await this.scheduleService.deleteSchedulesBydoctor(doctor.id, dto.calenderIds);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('update/:doctorId/:calenderIds')
    async updateSchedulesByDoctor(@jwt() doctor: Doctor, @Body() dto: CreateScheduleQueryDto): Promise<Schedule[]> {
        return await this.scheduleService.updateSchedulesforDoctor(doctor, dto.calenderIds);
    }
}
