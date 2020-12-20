import { TimeSlot, Calender } from '../entities';
import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(TimeSlot)
export class TimeSlotRepository extends Repository<TimeSlot> {
    async saveTimeSlot(timeslot: TimeSlot, calenders: Calender[]): Promise<TimeSlot> {
        return await this.manager.transaction(async entityManager => {
            const data = await this.manager.getRepository(TimeSlot).save(timeslot);

            await this.manager.getRepository(Calender).save(calenders);

            return data;
        });
    }

    async checkTime(startTime: number, endTime): Promise<TimeSlot[]> {
        return await this.createQueryBuilder('timeslot')
            .where('(timeslot.start > :startTime AND timeslot.start < :endTime)', { startTime, endTime })
            .orWhere('(timeslot.end > :startTime AND timeslot.end <= :endTime)', { startTime, endTime })
            .orWhere('(timeslot.start <= :startTime AND timeslot.end >= :endTime)', { startTime, endTime })
            .andWhere('timeslot.deletedAt IS NULL')
            .getMany();
    }

    async getTimeSlot(name: string): Promise<TimeSlot[]> {
        const timeSlot = this.createQueryBuilder('timeslot').where('timeslot.deletedAt IS NULL');

        if (name) {
            timeSlot.andWhere('timeslot.name LIKE :name', { name: `%${name}%` });
        }

        timeSlot.orderBy('timeslot.name', 'ASC');
        return await timeSlot.getMany();
    }

    async getTimeSlotById(id: string): Promise<TimeSlot> {
        return await this.createQueryBuilder('timeslot')
            .where('timeslot.deletedAt IS NULL')
            .andWhere('timeslot.id LIKE :id', { id })
            .getOne();
    }

    async deleteTimeSlot(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('timeslot')
            .delete()
            .from(TimeSlot)
            .where('timeslot.id LIKE :id', { id })
            .execute();
    }
}
