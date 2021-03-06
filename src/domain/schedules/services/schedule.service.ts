import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { CalenderServiceToken, DayOfWeek } from '../constants';
import { Schedule } from '../entities';
import { ICalenderService, IScheduleService } from '../interfaces';
import { ScheduleRepository } from '../repositories';
import { isNil } from 'lodash';

@Injectable()
export class ScheduleService implements IScheduleService {
    constructor(
        //     @Inject(forwardRef(() => CalenderRepository))
        // private calenderService: CalenderRepository,
        @InjectRepository(ScheduleRepository)
        private readonly scheduleRepository: ScheduleRepository,
        @Inject(CalenderServiceToken)
        private readonly calenderService: ICalenderService
    ) {}

    async createSchedule(doctor: Doctor, calenderIds: string[]): Promise<Schedule[]> {
        const schedule = new Schedule();
        const scheduleList = new Array();

        schedule.doctor = doctor;
        for (let key = 0; key < calenderIds.length; key++) {
            const existedSchedule = await this.scheduleRepository.getExistedSchedule(doctor.id, calenderIds[key])

            if (!isNil(existedSchedule)) {
                const existedCalender = await this.calenderService.getCalenderById(existedSchedule.calender.id);
                throw new BadRequestException(`The calender ${existedCalender.day} ${existedCalender.timeslot.name} is not available.`)
            }

            schedule.id = uuid();
            const calender = await this.calenderService.getCalenderById(calenderIds[key]);
            schedule.calender = calender;
            scheduleList[key] = await this.scheduleRepository.createSchedule(schedule);
        }

        return scheduleList;
    }

    public async updateSchedulesForDoctor(doctor: Doctor, calenderIds: string[]): Promise<any> {
        const scheduleForDoctor = await this.scheduleRepository.getScheduleByDoctor(doctor.id);
        const exitCalenderIds = [];
        const errors = [];

        for (const schedule of scheduleForDoctor) {
            exitCalenderIds.push(schedule.calender.id);
        }

        for (const calenderId of calenderIds) {
            let check = 1;
            for (const exitCalenderId of exitCalenderIds) {
                if (calenderId === exitCalenderId) {
                    check = 0;
                }
            }
            if (check) {
                await this.createOneSchedule(doctor, calenderId);
            }
        }

        for (const exitCalenderId of exitCalenderIds) {
            let check = 1;
            for (const calenderId of calenderIds) {
                if (exitCalenderId === calenderId) {
                    check = 0;
                }
            }
            if (check) {
                try {
                    await this.scheduleRepository.deleteSchedulesByDoctor(doctor.id, exitCalenderId);
                } catch {
                    const exitCaldender = await this.calenderService.getCalenderById(exitCalenderId);
                    errors.push(
                        `The schedule '${exitCaldender.day}: ${exitCaldender.timeslot.name}' can not delete, that is have been booking by a user.`
                    );
                }
            }
        }

        return {
            data: await this.getSchedulesByDoctor(doctor.id),
            errors
        };
    }

    async createOneSchedule(doctor: Doctor, calenderId: string): Promise<Schedule> {
        const schedule = new Schedule();
        schedule.id = uuid();
        schedule.doctor = doctor;
        const calender = await this.calenderService.getCalenderById(calenderId);
        schedule.calender = calender;

        return await this.scheduleRepository.createSchedule(schedule);
    }

    async deleteSchedulesByDoctor(doctorId: string, calenderId: string): Promise<boolean> {
        try {
            const data = await this.scheduleRepository.deleteSchedulesByDoctor(doctorId, calenderId);
        } catch {
            throw new BadRequestException(`The schedule can not delete, that is have been booking by a user.`);
        }

        return true;
    }

    private async deleteAllScheduleByDoctor(doctorId: string): Promise<DeleteResult> {
        return await this.scheduleRepository.deleteAllScheduleByDoctor(doctorId);
    }

    async getSchedulesByDoctor(doctorId: string, day?: DayOfWeek): Promise<any> {
        const datas = await this.scheduleRepository.getScheduleByDoctor(doctorId, day);

        const result = {
            MONDAY: [],
            TUESDAY: [],
            WEDNESDAY: [],
            THURSDAY: [],
            FRIDAY: [],
            SATURDAY: [],
            SUNDAY: []
        };

        for (const data of datas) {
            if (data.calender.day === DayOfWeek.MONDAY) {
                result.MONDAY.push({
                    scheduleId: data.id,
                    busy: data.busy,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.TUESDAY) {
                result.TUESDAY.push({
                    scheduleId: data.id,
                    busy: data.busy,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.WEDNESDAY) {
                result.WEDNESDAY.push({
                    scheduleId: data.id,
                    busy: data.busy,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.THURSDAY) {
                result.THURSDAY.push({
                    scheduleId: data.id,
                    busy: data.busy,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.FRIDAY) {
                result.FRIDAY.push({
                    scheduleId: data.id,
                    busy: data.busy,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.SATURDAY) {
                result.SATURDAY.push({
                    scheduleId: data.id,
                    busy: data.busy,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.SUNDAY) {
                result.SUNDAY.push({
                    scheduleId: data.id,
                    busy: data.busy,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }
        }
        return result;
    }

    async getSchedulesByDoctorForUser(doctorId: string, day?: DayOfWeek): Promise<any> {
        const datas = await this.scheduleRepository.getScheduleByDoctor(doctorId, day);

        const result = {
            MONDAY: [],
            TUESDAY: [],
            WEDNESDAY: [],
            THURSDAY: [],
            FRIDAY: [],
            SATURDAY: [],
            SUNDAY: []
        };

        for (const data of datas) {
            if (data.calender.day === DayOfWeek.MONDAY && data.busy === false) {
                result.MONDAY.push({
                    scheduleId: data.id,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.TUESDAY && data.busy === false) {
                result.TUESDAY.push({
                    scheduleId: data.id,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.WEDNESDAY && data.busy === false) {
                result.WEDNESDAY.push({
                    scheduleId: data.id,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.THURSDAY && data.busy === false) {
                result.THURSDAY.push({
                    scheduleId: data.id,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.FRIDAY && data.busy === false) {
                result.FRIDAY.push({
                    scheduleId: data.id,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.SATURDAY && data.busy === false) {
                result.SATURDAY.push({
                    scheduleId: data.id,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }

            if (data.calender.day === DayOfWeek.SUNDAY && data.busy === false) {
                result.SUNDAY.push({
                    scheduleId: data.id,
                    calenderId: data.calender.id,
                    timeSlot: data.calender.timeslot.name
                });
            }
        }
        return result;
    }

    async setBusy(id: string): Promise<void> {
        return await this.scheduleRepository.setBusy(id);
    }
}
