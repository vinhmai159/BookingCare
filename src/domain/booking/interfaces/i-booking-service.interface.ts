import { Booking } from '../entities';
import { BookingStatus } from '../constants';
import { MedicalRecord } from '../../medical-record';

export interface IBookingService {
    createBooking(userId: string, scheduleId: string): Booking | Promise<Booking>;

    getBooking(bookingId?: string, scheduleId?: string): Booking | Promise<Booking>;

    getBookings(doctorId: string): Booking[] | Promise<Booking[]>;

    updateStatus(bookingId: string, scheduleId: string, status: BookingStatus, medicalRecord: MedicalRecord): Booking | Promise<Booking>;
}
