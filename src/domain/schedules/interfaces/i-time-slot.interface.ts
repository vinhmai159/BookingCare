import { TimeSlot } from '../entities';
import { DeleteResult } from 'typeorm';
import { UpdateTimeSlotQueryDto } from '../dto';

export interface ITimeSlotService {
    createTimeSlot(startTime: string, endTime: string): TimeSlot | Promise<TimeSlot>;

    getTimeSlot(name: string): TimeSlot[] | Promise<TimeSlot[]>;

    getTimeSlotById(id: string): TimeSlot | Promise<TimeSlot>;

    deleteTimeSlot(id: string): Promise<boolean>;

    updateTimeSlot(id: string, timeSlot: UpdateTimeSlotQueryDto): TimeSlot | Promise<TimeSlot>;
}
