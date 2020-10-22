import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, jwt } from '../../../common';
import { Doctor } from '../../doctors';
import { ScheduleServiceToken } from '../constants';
import { IScheduleService } from '../constants/interfaces';
import {
    CreateOneSchedulesQueryDto,
    CreateScheduleParamDto,
    GetScheduleByDoctorQueryDto,
    ScheduleByDoctor,
    UpdateScheduleParamDto
} from '../dto';
import { Schedule } from '../entities';

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
    async createSchedules(@jwt() doctor: Doctor, @Body() dto: UpdateScheduleParamDto): Promise<Schedule[]> {
        return await this.scheduleService.createSchedule(doctor, dto.calenderIds);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('create-one')
    async createSchedule(@jwt() doctor: Doctor, @Body() dto: CreateOneSchedulesQueryDto): Promise<Schedule> {
        return await this.scheduleService.createOneSchedule(doctor, dto.calenderId);
    }

    @Post('show-schedule')
    async getScheduleByDoctorForUser(@Body() dto: GetScheduleByDoctorQueryDto): Promise<ScheduleByDoctor[]> {
        return await this.scheduleService.getSchedulesByDoctorForUser(dto.doctorId, dto.day);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('/get-schedule-for-doctor')
    async getScheduleByDoctor(@jwt() doctor: Doctor): Promise<ScheduleByDoctor[]> {
        return await this.scheduleService.getSchedulesByDoctor(doctor.id);
    }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard)
    // @Delete('delete/:doctorId')
    // async deleteAllSchedules(@jwt() doctor: Doctor): Promise<DeleteResult> {
    //     return await this.scheduleService.(doctor.id, dto.calenderIds);
    // }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('delete/:calenderId')
    async deleteSchedules(@jwt() doctor: Doctor, @Param() dto: CreateScheduleParamDto): Promise<boolean> {
        return await this.scheduleService.deleteSchedulesByDoctor(doctor.id, dto.calenderId);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('update/:calenderIds')
    async updateSchedulesByDoctor(@jwt() doctor: Doctor, @Body() dto: UpdateScheduleParamDto): Promise<Schedule[]> {
        return await this.scheduleService.updateSchedulesForDoctor(doctor, dto.calenderIds);
    }
}
