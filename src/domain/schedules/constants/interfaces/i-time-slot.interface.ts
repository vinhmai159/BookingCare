import {TimeSlot} from '../../entities';
import { DeleteResult } from 'typeorm';

export interface ITimeSlotService {
    createTimeSlot(timeSlot: TimeSlot): TimeSlot | Promise<TimeSlot>;

    getTimeSlot(name: string): TimeSlot[] | Promise<TimeSlot[]>;

    getTimeSlotById(id: string): TimeSlot | Promise<TimeSlot>;

    deleteTimeSlot(id: string): Promise<DeleteResult>;

    updateTimeSlot(timeSlot: TimeSlot): TimeSlot | Promise<TimeSlot>;
}