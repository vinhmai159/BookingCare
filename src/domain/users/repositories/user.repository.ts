import { User } from '../entities';
import { Repository, EntityRepository, DeleteResult } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async saveUser(user: User): Promise<User> {
        return this.save(user);
    }

    public async getUsers(data?: string): Promise<[User[], number]> {
        const users = this.createQueryBuilder('user');

        if (data) {
            users.andWhere('(user.fistName LIKE :data OR user.lastName LIKE :data OR user.email LIKE :data OR user.address LIKE :data)', { data: `%${data}%` });
        }

        users
            .orderBy('user.fistName')
            .addOrderBy('user.lastname')
            .addOrderBy('user.email')
            .addOrderBy('user.address');

        return await users.getManyAndCount();
    }

    public async getUserById(id: string): Promise<User> {
        return await this.createQueryBuilder('user')
            .where('user.id = :id', { id })
            // .leftJoinAndSelect('user.booking', 'Booking')
            .getOne();
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await this.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('user')
            .delete()
            .from(User)
            .where('users.id = :id', { id })
            .execute();
    }
}
