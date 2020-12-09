import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { isNil } from 'lodash';
import { MedicalRecord } from '../../medical-record';
import { BookingStatus } from '../constants';

export class CreateMedicalRecordDto {
    @IsOptional()
    symptoms: string;

    @IsOptional()
    diagnostic: string;

    @IsOptional()
    prescription: string;

    public validate(status: BookingStatus): void {
        if (status === BookingStatus.DONE) {
            if (isNil(this.symptoms) || this.symptoms === '') {
                throw new BadRequestException('This symptoms should not empty with status DONE.');
            }

            if (isNil(this.diagnostic) || this.diagnostic === '') {
                throw new BadRequestException('This diagnostic should not empty with status DONE.');
            }

            if (isNil(this.prescription) || this.prescription === '') {
                throw new BadRequestException('This prescription should not empty with status DONE.');
            }
        }
    }

    public toEntity(): MedicalRecord {
        const entity = plainToClass(MedicalRecord, this);

        return entity;
    }
}
