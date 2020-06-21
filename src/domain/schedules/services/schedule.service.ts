import { Injectable, Inject, BadRequestException, ExceptionFilter, ConflictException } from '@nestjs/common';
import { IScheduleService, ICalenderService } from '../interfaces';
import { ScheduleRepository } from '../repositories';
import { Schedule } from '../entities';
import { DoctorService } from '../../doctors';
import { CalenderService } from './calender.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { Calender } from '../entities/calender.entity';
import { DayOfWeek, CalenderServiceToken } from '../constants';
import { IDoctorService } from '../../doctors/interfaces';
import { DoctorServiceToken } from '../../doctors/constants';
import { DoctorRepository } from '../../doctors/repositories';
import {v4 as uuid} from 'uuid';
import { DeleteResult } from 'typeorm';
import {ScheduleByDoctor} from '../dto';
import { throwError } from 'rxjs';
import {BaseExceptionFilter} from '@nestjs/core';
import {count} from 'console';

@Injectable()
export class ScheduleService implements IScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private scheduleRepository: ScheduleRepository,
        @InjectRepository(Doctor)
        private readonly doctorService: DoctorRepository,
        @Inject(CalenderServiceToken)
        private readonly calenderServide: ICalenderService
    ) {}

    async createSchedule(doctor: Doctor, calenderIds: string[]): Promise<Schedule[]> {
        const schedule = new Schedule();
        const scheduleList = new Array();

        schedule.doctor = doctor;
        for (let key = 0; key < calenderIds.length; key++) {
            schedule.id = uuid();
            const calender = await this.calenderServide.getCalenderById(calenderIds[key]);
            schedule.calender = calender;
            scheduleList[key] = await this.scheduleRepository.createSchedule(schedule);
        }
        // console.log(scheduleList);

        return scheduleList;
    }

    public async updateSchedulesforDoctor(doctor: Doctor, calenderIds: string[]): Promise<Schedule[]> {
        try {
        await this.scheduleRepository.deleteAllScheduleByDoctor(doctor.id);
        } catch(e) {
            throw new BadRequestException('The Schedule had booking by a user, CAN NOT CHANGE THE SCHEDULE.');
        }
        const updateSchdeuleBYDoctor = await this.createSchedule(doctor, calenderIds);
        return updateSchdeuleBYDoctor;
    }

    async createOneSchedule(doctor: Doctor, calenderId: string): Promise<Schedule> {
        const schedule = new Schedule();
        schedule.id = uuid();
        schedule.doctor = doctor;
        const calender = await this.calenderServide.getCalenderById(calenderId);
        schedule.calender = calender;

        return await this.scheduleRepository.createSchedule(schedule);
    }

    async deleteSchedulesBydoctor(doctorId: string, calenderIds: string[]): Promise<any> {
        let count = 0;
        let deletedId = [];
        let error = [];
        for (const element of calenderIds) {
           try {
            const scheduleDelete = await this.scheduleRepository.deleteSchedulesByDoctor(doctorId, element);
            if (scheduleDelete) {
                count += 1;
                deletedId.push(doctorId);
            }
           } catch (e) {
               error.push({
                   error: e,
                   message: `The schedule '${element}' is can not delete, that is have been booking by a user. `
               })
           }
        }
        return {
            deletedId,
            total: count,
            error
        };
    }

    private async deleteAllScheduleByDoctor(doctorId: string): Promise<DeleteResult> {
        return await this.scheduleRepository.deleteAllScheduleByDoctor(doctorId);
    }

    async getSchedulesByDoctor(doctorId: string, day: DayOfWeek): Promise<any[]> {
        const datas = await this.scheduleRepository.getScheduleByDoctor(doctorId, day);
        // let dayy;
        // let timeSlot;
        // tslint:disable-next-line: new-parens
        const result = [];

        for (const data of datas) {
            // tslint:disable-next-line: new-parens
            const test = new ScheduleByDoctor;

            test.day = data.calender.day;
            test.timeSlot = data.calender.timeslot.name;
            result.push(test);
        }
        return result;
    }
    async setBusy(id: string): Promise<void> {
        return await this.scheduleRepository.setBusy(id);
    }
}
