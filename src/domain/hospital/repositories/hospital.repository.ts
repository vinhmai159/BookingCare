import { Hospital } from '../entities';
import { Repository, EntityRepository, DeleteResult } from 'typeorm';

@EntityRepository(Hospital)
export class HospitalRepository extends Repository<Hospital> {
    public async getHospitals(name?: string): Promise<[Hospital[], number]> {
        const queryBuilder = this.createQueryBuilder('Hospital');

        if (name !== null && name !== undefined) {
            queryBuilder.where('Hospital.name LIKE :name', { name: `%${name}%` });
        }

        queryBuilder.orderBy('Hospital.name', 'ASC');

        return await queryBuilder.getManyAndCount();
    }

    public async getHospitalById(id: string): Promise<Hospital> {
        return await this.createQueryBuilder('Hospital')
            .where('Hospital.id = :id', { id })
            .getOne();
    }

    public async deleteHospital(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('Hospital')
            .delete()
            .from(Hospital)
            .where('Hospital.id = :id', { id })
            .execute();
    }
}
