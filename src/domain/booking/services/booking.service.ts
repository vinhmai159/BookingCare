import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { GetScheduleByIdQuery, SaveScheduleQuery, Schedule } from '../../schedules';
import { GetUserQuery, User } from '../../users';
import { BookingStatus } from '../constants';
import { Booking } from '../entities';
import { IBookingService } from '../interfaces';
import { BookingRepository } from '../repositories';
import { isNil } from 'lodash';
import { v4 as uuid } from 'uuid';
import { MedicalRecord } from '../../medical-record';
import { weekday } from '../constants/index';

@Injectable()
export class BookingService implements IBookingService {
    constructor(
        @InjectRepository(BookingRepository)
        private readonly bookingRepository: BookingRepository,
        private readonly queryBus: QueryBus
    ) {}

    private addDays(currentDate: Date, days: number) {
        currentDate.setDate(currentDate.getDate() + days);

        return currentDate;
    }

    public async createBooking(userId: string, scheduleId: string): Promise<Booking> {
        const booking = new Booking();
        booking.id = uuid();

        const user = await this.queryBus.execute<GetUserQuery, User>(new GetUserQuery(userId));
        const schedule = await this.queryBus.execute<GetScheduleByIdQuery, Schedule>(
            new GetScheduleByIdQuery(scheduleId)
        );

        if (schedule.busy) {
            throw new BadRequestException('The schedule of doctor is busy');
        }

        let existedDay: number;
        for (const index in weekday) {
            if (schedule.calender.day === weekday[index]) {
                existedDay = Number(index);
            }
        }

        const toDate = new Date();
        const toDay = toDate.getDay();

        let date: Date;

        const dayDifference = toDay - existedDay;
        if (dayDifference < 0) {
            date = this.addDays(toDate, -dayDifference);
        } else if (dayDifference > 0) {
            date = this.addDays(toDate, 7 - dayDifference);
        } else if (dayDifference === 0) {
            throw new BadRequestException('Can not booking this date.')
        }

        booking.user = user;
        booking.schedule = schedule;
        booking.status = BookingStatus.BOOKED;
        booking.date = date;

        const data = await this.bookingRepository.save(booking);
        schedule.busy = true;
        await this.queryBus.execute<SaveScheduleQuery, Schedule>(new SaveScheduleQuery(schedule));

        return data;
    }

    public async getBooking(bookingId?: string, scheduleId?: string): Promise<Booking> {
        const data = await this.bookingRepository.getBooking({ id: bookingId, scheduleId });

        if (isNil(data)) {
            throw new NotFoundException('The booking was not found!');
        }

        return data;
    }

    public async getUserBooking(userId: string): Promise<Booking[]> {
        const [data, total] = await this.bookingRepository.getUserBookings({ userId, status: BookingStatus.BOOKED });

        return data;
    }

    public async getBookings(doctorId: string): Promise<Booking[]> {
        const [data] = await this.bookingRepository.getBookings({ doctorId });

        if (isNil(data)) {
            throw new NotFoundException('The bookings were not found!');
        }

        return data;
    }

    public async updateStatus(
        bookingId: string,
        scheduleId: string,
        status: BookingStatus,
        medicalRecord: MedicalRecord
    ): Promise<Booking> {
        const booking = await this.bookingRepository.getBooking({ id: bookingId });

        if (isNil(booking)) {
            throw new NotFoundException('The booking was not found!');
        }

        const schedule = await this.queryBus.execute<GetScheduleByIdQuery, Schedule>(
            new GetScheduleByIdQuery(scheduleId)
        );

        schedule.busy = false;

        booking.status = status;
        medicalRecord.id = uuid();
        medicalRecord.user = booking.user;

        const data = await this.bookingRepository.UpdateStatus(booking, schedule, medicalRecord);

        return data;
    }

    public async rejectBooking(bookingId: string, scheduleId: string): Promise<Booking> {
        const booking = await this.bookingRepository.getBooking({ id: bookingId });

        if (isNil(booking)) {
            throw new NotFoundException('The booking was not found!');
        }

        if (new Date(booking.date) >= new Date()) {
            throw new NotFoundException('Can not reject schedule, because it unexpired');
        }

        const schedule = await this.queryBus.execute<GetScheduleByIdQuery, Schedule>(
            new GetScheduleByIdQuery(scheduleId)
        );

        schedule.busy = false;

        booking.status = BookingStatus.REJECT;

        const data = await this.bookingRepository.UpdateStatus(booking, schedule);

        return data;
    }
}
