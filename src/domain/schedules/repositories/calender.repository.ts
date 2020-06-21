import { Calender } from '../entities';
import {Repository, EntityRepository, DeleteResult} from 'typeorm';
import {DayOfWeek} from '../constants';

@EntityRepository(Calender)
export class CalenderRepository extends Repository<Calender>{
    async saveCalender(calender: Calender): Promise<Calender> {
        return await this.save(calender);
    }

    async getCalender(day: DayOfWeek, timeSlotName: string,): Promise<Calender[]> {
        const calender = this.createQueryBuilder('calender');

        if (day) {
            calender.orWhere('calender.day LIKE :day', {day});
        }

        if (timeSlotName) {
            calender.leftJoin('calender.timeslot', 'timeslot')
                    .orWhere('timeslot.name = :timeSlotName', {timeSlotName: `%${timeSlotName}%`});
        }

        return await calender.leftJoinAndSelect('calender.timeslot', 'timeslot')
                                .orderBy('calender.day', 'ASC')
                                .getMany();
    }

    async getCalenderById(id: string): Promise<Calender> {
        return await this.createQueryBuilder('calender')
                            .where('calender.id LIKE :id', {id})
                            .leftJoinAndSelect('calender.timeslot', 'timeslot')
                            .getOne();
    }

    async deleteCalender(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('calender')
                            .delete()
                            .from(Calender)
                            .where('calender.id LIKE :id', {id})
                            .execute();
    }
}