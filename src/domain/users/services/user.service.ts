import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import {IUserService} from '../interfaces';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from '../repositories';
import {User} from '../entities';
import {DeleteResult} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService implements IUserService {
    constructor (
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    public async createUser(user: User): Promise<User> {
        user.id = uuid();
        return await this.userRepository.saveUser(user);
    }

    public async getUsers(name?: string, email?: string, address?: string): Promise<[User[], number]> {
        const [data, count] = await this.userRepository.getUsers(name, email, address);
         return [data, count];
    }

    public async getUserById(id: string): Promise<User> {
        const data = await this.userRepository.getUserById(id);
        return data;
    }

    public async updateUser(id: string, user: User): Promise<User> {
        const exitsUser = await this.userRepository.getUserById(id);

        if (!exitsUser) {
            throw new NotFoundException('The User is not Found')
        }

        user.id = exitsUser.id;
        if (user.fistName) {
            user.fistName = exitsUser.fistName;
        }

        if (user.lastName) {
            user.lastName = exitsUser.lastName;
        }

        if (user.address) {
            user.address = exitsUser.address;
        }

        if (user.birthday) {
            user.birthday = exitsUser.birthday;
        }

        if (user.gender) {
            user.gender = exitsUser.gender;
        }

        return await this.userRepository.saveUser(user);
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return await this.userRepository.deleteUser(id);
    }
}
