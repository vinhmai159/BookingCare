import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAdminQuery } from '../impl';
import { Admin } from '../../entities';
import { AdminRepository } from '../../repositories';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(GetAdminQuery)
export class GetAdminHandler implements IQueryHandler<GetAdminQuery, Admin> {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository
    ) {}

    public async execute(query: GetAdminQuery): Promise<Admin> {
        const admin = await this.adminRepository.getAdminById(query.id);

        return admin;
    }
}
