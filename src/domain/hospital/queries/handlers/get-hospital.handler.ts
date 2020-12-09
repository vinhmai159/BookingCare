import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { Hospital } from '../../entities';
import { HospitalRepository } from '../../repositories';
import { GetHospitalQuery } from '../impl';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetHospitalQuery)
export class GetHospitalHandler implements IQueryHandler<GetHospitalQuery, Hospital> {
    constructor(
        @InjectRepository(HospitalRepository)
        private readonly hospitalRepository: HospitalRepository
    ) {}

    public async execute(query: GetHospitalQuery): Promise<Hospital> {
        const hospital = await this.hospitalRepository.getHospitalById(query.id);

        if (isNil(hospital)) {
            throw new NotFoundException('This hospital was not found.');
        }

        return hospital;
    }
}
