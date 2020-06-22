import { Expertise } from '../entities';
import { Repository, EntityRepository, DeleteResult } from 'typeorm';

@EntityRepository(Expertise)
export class ExpertiseRepository extends Repository<Expertise> {
    public async saveExpertise(expertise: Expertise): Promise<Expertise> {
        return await this.save(expertise);
    }

    public async getExpertises(name?: string): Promise<[Expertise[], number]> {
        const expertises = this.createQueryBuilder('expertise');

        if (name) {
            expertises.where('expertise.name LIKE :name', { name: `%${name}%` });
        }

        expertises.orderBy('expertise.name', 'ASC');

        return await expertises.getManyAndCount();
    }

    public async getExpertiseById(id: string): Promise<Expertise> {
        return await this.createQueryBuilder('expertise')
            .where('expertise.id = :id', { id })
            .getOne();
    }

    public async deleteExpertise(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('expertise')
            .delete()
            .from(Expertise)
            .where('expertise.id = :id', { id })
            .execute();
    }
}
