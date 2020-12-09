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

@Injectable()
export class BookingService implements IBookingService {
    constructor(
        @InjectRepository(BookingRepository)
        private readonly bookingRepository: BookingRepository,
        private readonly queryBus: QueryBus
    ) {}

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

        booking.user = user;
        booking.schedule = schedule;
        booking.status = BookingStatus.BOOKED;

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

        const data = await this.bookingRepository.UpdateStatus(booking, medicalRecord, schedule);

        return data;
    }
}
