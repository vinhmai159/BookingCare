import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { BookingStatus } from '../constants';
import { Booking } from '../entities';
import { isNil } from 'lodash';
import { MedicalRecord } from '../../medical-record/entities/medical-record.entity';

export interface BookingQueryOptions {
    id?: string;
    ids?: string;
    userId?: string;
    scheduleId?: string;
    doctorId?: string;

    status?: BookingStatus;
}

@Injectable()
@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
    public async getBooking(options: BookingQueryOptions): Promise<Booking> {
        const queryBuilder = this.createQueryBuilder('Booking');

        this.applyQueryOptions(queryBuilder, options);

        return queryBuilder.getOne();
    }

    public async getBookings(options: BookingQueryOptions): Promise<[Booking[], number]> {
        const queryBuilder = this.createQueryBuilder('Booking')
            .leftJoinAndSelect('Booking.schedule', 'schedule')
            .leftJoinAndSelect('schedule.doctor', 'doctor');

        this.applyQueryOptions(queryBuilder, options);

        queryBuilder.addOrderBy('Booking.createAt', 'DESC');

        return queryBuilder.getManyAndCount();
    }

    public async UpdateStatus(booking: Booking, medicalRecord: MedicalRecord): Promise<Booking> {
        return await this.manager.transaction(async (entityManager) => {
            await entityManager.getRepository(MedicalRecord).save(medicalRecord);

            return await entityManager.getRepository(Booking).save(booking);
        })
    }

    private applyQueryOptions(
        queryBuilder: SelectQueryBuilder<Booking>,
        options: BookingQueryOptions
    ): SelectQueryBuilder<Booking> {
        if (!isNil(options.id)) {
            queryBuilder.andWhere('Booking.id = :id', { id: options.id });
        }

        if (!isNil(options.ids)) {
            queryBuilder.andWhere('Booking.id IN (:...ids)', { ids: options.ids });
        }

        if (!isNil(options.scheduleId)) {
            queryBuilder.andWhere('Booking.scheduleId = :scheduleId', { scheduleId: options.scheduleId });
        }

        if (!isNil(options.userId)) {
            queryBuilder.andWhere('Booking.userId = :userId', { userId: options.userId });
        }

        if (!isNil(options.doctorId)) {
            queryBuilder.andWhere('doctor.id = :doctorId', { doctorId: options.doctorId });
        }

        if (!isNil(options.status)) {
            queryBuilder.andWhere('Booking.status = :status', { status: options.status });
        }

        return queryBuilder;
    }
}
