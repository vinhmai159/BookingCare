import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from '../entities';
import { IMedicalRecordService } from '../interfaces';
import { MedicalRecordRepository } from '../repositories';
import { isNil } from 'lodash';
import * as Moment from 'moment';

@Injectable()
export class MedicalRecordService implements IMedicalRecordService {
    constructor(
        @InjectRepository(MedicalRecordRepository)
        private readonly medicalRecordRepository: MedicalRecordRepository
    ) {}

    public async getMedicalRecord(medicalRecordId: string): Promise<MedicalRecord> {
        const data = await this.medicalRecordRepository.getMedicalRecord({ id: medicalRecordId });

        if (isNil(data)) {
            throw new NotFoundException('This medical record was not found!');
        }

        return data;
    }

    public async getMedicalRecords(userId: string): Promise<[MedicalRecord[], number]> {
        const [data, total] = await this.medicalRecordRepository.getMedicalRecords({ userId });

        return [data, total];
    }
}
