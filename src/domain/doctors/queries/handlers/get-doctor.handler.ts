import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDoctorQuery } from '../impl';
import { Doctor } from '../../entities';
import { DoctorRepository } from '../../repositories';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(GetDoctorQuery)
export class GetDoctorHandler implements IQueryHandler<GetDoctorQuery, Doctor> {
    constructor(
        @InjectRepository(DoctorRepository)
        private readonly doctorRepository: DoctorRepository
    ) {}

    public async execute(query: GetDoctorQuery): Promise<Doctor> {
        const doctor = await this.doctorRepository.getDoctorById(query.id);

        return doctor;
    }
}
