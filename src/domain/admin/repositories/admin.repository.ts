import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Admin } from '../entities';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
    public async saveAdmin(admin: Admin): Promise<Admin> {
        return await this.save(admin);
    }

    public async getAdmins(name?: string): Promise<[Admin[], number]> {
        const admins = this.createQueryBuilder('admin');

        if (name) {
            admins.where('admin.name LIKE :name', { name: `%${name}%` });
        }

        admins.orderBy('admin.name', 'ASC');

        return await admins.getManyAndCount();
    }

    public async getAdminById(id: string): Promise<Admin> {
        const admin = this.createQueryBuilder('admin')
            .where('admin.id = :id', { id })
            .getOne();

        return await admin;
    }

    public async getAdmin(userName: string): Promise<Admin> {
        const admin = this.createQueryBuilder('admin')
            .where('admin.userName = :userName', { userName })
            .getOne();

        return await admin;
    }

    public async deleteAdmin(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('admin')
            .delete()
            .from(Admin)
            .where('admin.id = :id', { id })
            .execute();
    }
}
