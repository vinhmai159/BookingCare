import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNull, isUndefined } from 'lodash';
import { DeleteResult } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Hospital } from '../entities';
import { IHospitalService } from '../interfaces';
import { HospitalRepository } from '../repositories';

@Injectable()
export class HospitalService implements IHospitalService {
    constructor(
        @InjectRepository(HospitalRepository)
        private readonly hospitalRepository: HospitalRepository
    ) {}

    public async createHospital(hospital: Hospital): Promise<Hospital> {
        hospital.id = uuid();
        return await this.hospitalRepository.save(hospital);
    }

    public async getHospitals(name?: string): Promise<[Hospital[], number]> {
        return await this.hospitalRepository.getHospitals(name);
    }

    public async deleteHospital(id: string): Promise<DeleteResult> {
        return await this.hospitalRepository.deleteHospital(id);
    }

    public async updateHospital(id: string, hospital: Hospital): Promise<Hospital> {
        const exitedHospital = await this.hospitalRepository.getHospitalById(id);

        if (isNull(exitedHospital) || isUndefined(exitedHospital)) {
            throw new NotFoundException('This hospital was not found!');
        }
        hospital.id = exitedHospital.id;

        return await this.hospitalRepository.save(hospital);
    }
}
