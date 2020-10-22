import {TimeSlotRepository} from '../repositories';
import {InjectRepository} from '@nestjs/typeorm';
import {TimeSlot} from '../entities';
import {Injectable} from '@nestjs/common';
import {
    DeleteResult,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import {ITimeSlotService} from '../constants/interfaces';

@Injectable()
export class TimeslotService implements ITimeSlotService {
    constructor (
        @InjectRepository(TimeSlotRepository)
        private readonly timeslotRepository: TimeSlotRepository,
    ) {}

    async createTimeSlot(timeSlot: TimeSlot): Promise<TimeSlot> {
        timeSlot.id = uuid();
        return await this.timeslotRepository.saveTimeSlot(timeSlot);
    }

    async getTimeSlot(name: string): Promise<TimeSlot[]> {
        return await this.timeslotRepository.getTimeSlot(name);
    }

    async getTimeSlotById(id: string): Promise<TimeSlot> {
        return await this.timeslotRepository.getTimeSlotById(id);
    }

    async deleteTimeSlot(id: string): Promise<DeleteResult> {
        return await this.timeslotRepository.deleteTimeSlot(id);
    }

    async updateTimeSlot(timeSlot: TimeSlot): Promise<TimeSlot> {
        const timeSlotWillUpdate = await this.timeslotRepository.getTimeSlotById(timeSlot.id);
        timeSlotWillUpdate.name = timeSlot.name;
        return await this.timeslotRepository.saveTimeSlot(timeSlotWillUpdate);
    }
}