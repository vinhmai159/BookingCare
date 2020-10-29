import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ICalenderService } from '../interfaces';
import { CalenderRepository, TimeSlotRepository } from '../repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from '../entities';
import { v4 as uuid } from 'uuid';
import { DayOfWeek } from '../constants';
import { DeleteResult } from 'typeorm';
import { SaveCalenderDataDto } from '../dto';
import { UpdateCalenderBodyDto } from '../dto/calender/update-calender-body.dto';
import { TimeSlot } from '../entities';

@Injectable()
export class CalenderService implements ICalenderService {
    constructor(
        @InjectRepository(CalenderRepository)
        private readonly calenderRepository: CalenderRepository,
        @InjectRepository(TimeSlotRepository)
        private readonly timeslotRepository: TimeSlotRepository,
        // @Inject(forwardRef(() => TimeSlotRepository))
        // private timeslotRepository: TimeSlotRepository,
    ) {}

    async createCalender(calenderDto: SaveCalenderDataDto): Promise<Calender> {
        // tslint:disable-next-line: new-parens
        const calender = new Calender();
        calender.id = uuid();
        calender.day = calenderDto.day;
        calender.timeslot = await this.timeslotRepository.getTimeSlotById(calenderDto.timeSlotId);
        // calender.timeslot = await this.timeslotRepository.getTimeSlotById(tim)
        return await this.calenderRepository.saveCalender(calender);
    }

    async getCalender(day: DayOfWeek, timeSlotName: string): Promise<any> {
        const calenders = await this.calenderRepository.getCalender(day, timeSlotName);
        const result = {
            MONDAY: [],
            TUESDAY: [],
            WEDNESDAY: [],
            THURSDAY: [],
            FRIDAY: [],
            SATURDAY: [],
            SUNDAY: []
        };

        for (const calender of calenders) {
            if (calender.day === DayOfWeek.MONDAY) {
                result.MONDAY.push({
                    calenderId: calender.id,
                    timeSlot: calender.timeslot.name
                });
            }

            if (calender.day === DayOfWeek.TUESDAY) {
                result.TUESDAY.push({
                    calenderId: calender.id,
                    timeSlot: calender.timeslot.name
                });
            }

            if (calender.day === DayOfWeek.WEDNESDAY) {
                result.WEDNESDAY.push({
                    calenderId: calender.id,
                    timeSlot: calender.timeslot.name
                });
            }

            if (calender.day === DayOfWeek.THURSDAY) {
                result.THURSDAY.push({
                    calenderId: calender.id,
                    timeSlot: calender.timeslot.name
                });
            }

            if (calender.day === DayOfWeek.FRIDAY) {
                result.FRIDAY.push({
                    calenderId: calender.id,
                    timeSlot: calender.timeslot.name
                });
            }

            if (calender.day === DayOfWeek.SATURDAY) {
                result.SATURDAY.push({
                    calenderId: calender.id,
                    timeSlot: calender.timeslot.name
                });
            }

            if (calender.day === DayOfWeek.SUNDAY) {
                result.SUNDAY.push({
                    calenderId: calender.id,
                    timeSlot: calender.timeslot.name
                });
            }
        }
        return result;
    }

    async getCalenderById(id: string): Promise<Calender> {
        return await this.calenderRepository.getCalenderById(id);
    }

    async deleteCalender(id: string): Promise<DeleteResult> {
        return await this.calenderRepository.deleteCalender(id);
    }

    async updateCalender(id: string, calenderDto: UpdateCalenderBodyDto): Promise<Calender> {
        const calenderWillUpdate = await this.calenderRepository.getCalenderById(id);
        calenderWillUpdate.day = calenderDto.day;
        calenderWillUpdate.timeslot = await this.timeslotRepository.getTimeSlotById(calenderDto.timeSlotId);
        return await this.calenderRepository.saveCalender(calenderWillUpdate);
    }
}
