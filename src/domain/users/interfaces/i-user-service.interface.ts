import { User } from '../entities';
import { DeleteResult } from 'typeorm';
export interface IUserService {
    createUser(user: User): Promise<User>;

    getUsers(name?: string, email?: string, address?: string): Promise<[User[], number]>

    getUserById(id: string): Promise<User>

    updateUser(id: string, user: User): Promise<User>

    deleteUser(Id: string): Promise<DeleteResult>
}