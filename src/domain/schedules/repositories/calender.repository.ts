import { Calender } from '../entities';
import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { DayOfWeek } from '../constants';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Calender)
export class CalenderRepository extends Repository<Calender> {
    async saveCalender(calender: Calender): Promise<Calender> {
        return await this.save(calender);
    }

    async getCalender(day: DayOfWeek, timeSlotName: string): Promise<Calender[]> {
        const calender = this.createQueryBuilder('calender').leftJoinAndSelect('calender.timeslot', 'timeslot');

        if (day) {
            calender.andWhere('calender.day LIKE :day', { day });
        }

        if (timeSlotName) {
            calender.andWhere('timeslot.name LIKE :timeSlotName', { timeSlotName: `%${timeSlotName}%` });
        }

        return await calender
            .orderBy('calender.day', 'ASC')
            .addOrderBy('timeslot.name', 'ASC')
            .getMany();
    }

    async getCalenderById(id: string): Promise<Calender> {
        return await this.createQueryBuilder('calender')
            .where('calender.id LIKE :id', { id })
            .leftJoinAndSelect('calender.timeslot', 'timeslot')
            .getOne();
    }

    async deleteCalender(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('calender')
            .delete()
            .from(Calender)
            .where('calender.id LIKE :id', { id })
            .execute();
    }

    public async deleteCalenderByTimeSlot(timeSlotId: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('calender')
            .delete()
            .from(Calender)
            .where('calender.timeslotId = :timeSlotId', { timeSlotId })
            .execute();
    }
}
