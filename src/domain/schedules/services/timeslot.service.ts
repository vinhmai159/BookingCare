import { TimeSlotRepository, CalenderRepository } from '../repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSlot, Calender } from '../entities';
import { forwardRef, Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ITimeSlotService } from '../interfaces';
import { UpdateTimeSlotQueryDto } from '../dto';
import { isNil } from 'lodash';
import { DayOfWeek } from '../constants/index';

@Injectable()
export class TimeslotService implements ITimeSlotService {
    constructor(
        @InjectRepository(TimeSlotRepository)
        private readonly timeslotRepository: TimeSlotRepository,
        @InjectRepository(CalenderRepository)
        private readonly calenderRepository: CalenderRepository // @Inject(forwardRef(() => CalenderRepository)) // private calenderRepository: CalenderRepository
    ) {}

    async createTimeSlot(startTime: string, endTime: string): Promise<TimeSlot> {
        const timeSlot = new TimeSlot();
        timeSlot.id = uuid();
        timeSlot.name = `${startTime} - ${endTime}`;

        const startTimeNumber = parseInt(startTime.split(':')[0]) + parseInt(startTime.split(':')[1]) / 60;
        const endTimeNUmber = parseInt(endTime.split(':')[0]) + parseInt(endTime.split(':')[1]) / 60;

        timeSlot.start = startTimeNumber;
        timeSlot.end = endTimeNUmber;

        const checkTime = await this.timeslotRepository.checkTime(startTimeNumber, endTimeNUmber);

        if (checkTime.length >= 1) {
            throw new BadRequestException(`The time slot ${startTime} - ${endTime} is overlap a other time slot.`);
        }

        const calenders: Calender[] = [];

        for (let item in DayOfWeek) {
            if (isNaN(Number(item))) {
                const calender = new Calender();
            calender.id = uuid();
            calender.day = item;
            calender.timeslot = timeSlot;

            calenders.push(calender);
            }
        }

        return await this.timeslotRepository.saveTimeSlot(timeSlot, calenders);
    }

    async getTimeSlot(name: string): Promise<TimeSlot[]> {
        return await this.timeslotRepository.getTimeSlot(name);
    }

    async getTimeSlotById(id: string): Promise<TimeSlot> {
        const data = await this.timeslotRepository.getTimeSlotById(id);

        if (isNil(data)) {
            throw new NotFoundException('This time slot was not found!');
        }

        return data;
    }

    async deleteTimeSlot(id: string): Promise<boolean> {
        const timeSlot = await this.getTimeSlotById(id);

        timeSlot.deletedAt = new Date();

        await this.timeslotRepository.save(timeSlot);

        return true;
    }

    async updateTimeSlot(id: string, timeSlot: UpdateTimeSlotQueryDto): Promise<TimeSlot> {
        const timeSlotWillUpdate = await this.timeslotRepository.getTimeSlotById(id);
        const existedTimeSlots = await this.timeslotRepository.getTimeSlot(
            `${timeSlot.startTime} - ${timeSlot.endTime}`
        );

        if (existedTimeSlots.length !== 0) {
            throw new BadRequestException(
                `The time slot ${timeSlot.startTime} - ${timeSlot.endTime} is same a other time slot.`
            );
        }

        const startTime = parseInt(timeSlot.startTime.split(':')[0]) + parseInt(timeSlot.startTime.split(':')[1]) / 60;
        const endTime = parseInt(timeSlot.endTime.split(':')[0]) + parseInt(timeSlot.endTime.split(':')[1]) / 60;

        const checkTime = await this.timeslotRepository.checkTime(startTime, endTime);

        if (checkTime.length >= 1) {
            if (checkTime.length === 1 && checkTime[0].id === id) {
                timeSlotWillUpdate.name = `${timeSlot.startTime} - ${timeSlot.endTime}`;
                return await this.timeslotRepository.save(timeSlotWillUpdate);
            }

            throw new BadRequestException(
                `The time slot ${timeSlot.startTime} - ${timeSlot.endTime} is overlap a other time slot.`
            );
        }

        timeSlotWillUpdate.name = `${timeSlot.startTime} - ${timeSlot.endTime}`;
        return await this.timeslotRepository.save(timeSlotWillUpdate);
    }
}
