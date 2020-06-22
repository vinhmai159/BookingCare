import { Schedule } from '../entities';
import {DayOfWeek} from '../constants';
import {DeleteResult} from 'typeorm';
import {ScheduleByDoctor} from '../dto';
import {Doctor} from '../../doctors';
export interface IScheduleService {
    createSchedule(doctor: Doctor, calenderIds: string[]): Schedule[] | Promise<Schedule[]>;

    updateSchedulesforDoctor(doctor: Doctor, calenderIds: string[]): Schedule[] | Promise<Schedule[]>;

    getSchedulesByDoctor(doctorId: string, day?: DayOfWeek): any[] | Promise<any[]>;

    getSchedulesByDoctorForUser(doctorId: string, day?: DayOfWeek): any[] | Promise<any[]>;

    createOneSchedule(doctor: Doctor, calenderId: string):Schedule | Promise<Schedule>;

    deleteSchedulesBydoctor(doctorId: string, calenderIds: string[]):DeleteResult | Promise<DeleteResult>;

    setBusy(id: string): void | Promise<void>;
}