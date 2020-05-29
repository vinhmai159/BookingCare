import { TimeSlot } from '../entities/timeSlot.entity';
import { Repository, EntityRepository, DeleteResult } from 'typeorm';

@EntityRepository(TimeSlot)
export class TimeSlotRepository extends Repository<TimeSlot> {
    async saveTimeSlot(timeslot: TimeSlot): Promise<TimeSlot> {
        return await this.save(timeslot);
    }

    async getTimeSlot(name: string): Promise<TimeSlot[]> {
        const timeSlot = this.createQueryBuilder('timeslot');

        if (name) {
            timeSlot.andWhere('timeslot.name = :name', {name: `%${name}%`});
        }

        return await timeSlot.getMany();
    }

    async getTimeSlotById(id: string): Promise<TimeSlot> {
        return await this.createQueryBuilder('timeslot')
                            .where('timeslot.id LIKE :id', {id})
                            .getOne();
    }

    async deleteTimeSlot(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('timeslot')
                            .delete()
                            .from(TimeSlot)
                            .where('timeslot.id LIKE :id', {id})
                            .execute();
    }
}