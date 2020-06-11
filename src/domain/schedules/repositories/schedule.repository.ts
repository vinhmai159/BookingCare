import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Schedule } from '../entities';
import {DayOfWeek} from '../constants';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
    async createSchedule(schedule: Schedule): Promise<Schedule> {
        return await this.save(schedule);
    }

    async getScheduleById(id: string): Promise<Schedule> {
        return await this.createQueryBuilder('schedule')
                            .where('schedule.id LIKE :id', {id})
                            .getOne()
    }

    async getScheduleByDoctor(doctorId: string, day: DayOfWeek): Promise<Schedule[]> {
        const scheduleByDoctor = this.createQueryBuilder('schedule')
                                        .where('schedule.doctorId LIKE :doctorId', {doctorId})
                                        .leftJoinAndSelect('schedule.calender', 'calender')
                                        .leftJoinAndSelect('calender.timeslot', 'timeslot')

        if (day) {
            scheduleByDoctor.andWhere('calender.day = :day', {day})
        }

        return await scheduleByDoctor.getMany();
    }

    async deleteSchedulesByDoctor(doctorId: string, calenderId: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('schedule')
                            .delete()
                            .from(Schedule)
                            .andWhere('schedule.doctorId LIKE :doctorId', {doctorId})
                            .andWhere('schedule.calenderId LIKE :calenderId', {calenderId})
                            .execute();
    }

    async setBusy(id: string): Promise<void> {
        const schedule = await this.getScheduleById(id);
        schedule.busy = true;
        this.save(schedule);
    }
}