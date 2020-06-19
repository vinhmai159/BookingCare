import { User } from '../entities';
import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { Schedule } from '../../schedules/entities/schedule.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async saveUser(user: User): Promise<User> {
        return this.save(user);
    }

    public async getUsers(name?: string, email?: string, address?: string): Promise<[User[], number]> {
        const users = this.createQueryBuilder('user');

        if (name) {
            users.andWhere('user.fistName LIKE :name OR user.lastName LIKE :name', {name: `%${name}%`})
        }

        if (email) {
            users.andWhere('user.email LIKE :email', {email: `%${email}%`})
        }

        if (address) {
            users.andWhere('user.address LIKE :address', {address: `%${address}%`})
        }

        users.orderBy('user.fistName')
            .addOrderBy('user.lastname')
            .addOrderBy('user.email')
            .addOrderBy('user.address')

        return await users.orderBy('user.fistName').getManyAndCount();
    }

    public async getUserById(id: string): Promise<User> {
        return await this.createQueryBuilder('user')
                            .where('user.id = :id', {id})
                            .getOne();
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await this.createQueryBuilder('user')
                            .where('user.email = :email', {email})
                            .getOne();
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('user')
                            .delete()
                            .from(User)
                            .where('user.id = :id', {id})
                            .execute();
    }
}
