import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { MedicalRecord } from '../entities';

export interface MedicalRecordOptions {
    id?: string;
    userId?: string;

    fromDate?: Date;
    toDate?: Date;
}

@Injectable()
@EntityRepository(MedicalRecord)
export class MedicalRecordRepository extends Repository<MedicalRecord> {
    public async getMedicalRecord(options: MedicalRecordOptions): Promise<MedicalRecord> {
        const queryBuilder = this.createQueryBuilder('MedicalRecord');

        this.applyQueryOptions(queryBuilder, options);

        return await queryBuilder.getOne();
    }

    public async getMedicalRecords(options: MedicalRecordOptions): Promise<[MedicalRecord[], number]> {
        const queryBuilder = this.createQueryBuilder('MedicalRecord');

        this.applyQueryOptions(queryBuilder, options);

        queryBuilder.addOrderBy('MedicalRecord.createAt', 'DESC');

        return await queryBuilder.getManyAndCount();
    }

    private applyQueryOptions(
        queryBuilder: SelectQueryBuilder<MedicalRecord>,
        options: MedicalRecordOptions
    ): SelectQueryBuilder<MedicalRecord> {
        if (!isNil(options.id)) {
            queryBuilder.andWhere('MedicalRecord.id LIKE :id', { id: options.id });
        }

        if (!isNil(options.userId)) {
            queryBuilder.andWhere('user.id LIKE :userId', { userId: options.userId });
        }

        if (!isNil(options.fromDate) && !isNil(options.toDate)) {
            queryBuilder.andWhere(`MedicalRecord.createAt BETWEEN :fromDate AND :toDate`, {
                fromDate: options.fromDate,
                toDate: options.toDate
            });
        } else if (!isNil(options.fromDate)) {
            queryBuilder.andWhere(`MedicalRecord.createAt >= :fromDate`, { fromDate: options.fromDate });
        } else if (!isNil(options.toDate)) {
            queryBuilder.andWhere(`MedicalRecord.createAt <= :toDate`, {
                toDate: options.toDate
            });
        }

        return queryBuilder;
    }
}
