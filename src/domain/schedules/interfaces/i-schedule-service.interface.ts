import { Doctor } from '../../doctors';
import { DayOfWeek } from '../constants';
import { Schedule } from '../entities';
export interface IScheduleService {
    createSchedule(doctor: Doctor, calenderIds: string[]): Schedule[] | Promise<Schedule[]>;

    updateSchedulesForDoctor(doctor: Doctor, calenderIds: string[]): Schedule[] | Promise<Schedule[]>;

    getSchedulesByDoctor(doctorId: string, day?: DayOfWeek): any[] | Promise<any[]>;

    getSchedulesByDoctorForUser(doctorId: string, day?: DayOfWeek): any[] | Promise<any[]>;

    createOneSchedule(doctor: Doctor, calenderId: string): Schedule | Promise<Schedule>;

    deleteSchedulesByDoctor(doctorId: string, calenderId: string): boolean | Promise<boolean>;

    setBusy(id: string): void | Promise<void>;
}
