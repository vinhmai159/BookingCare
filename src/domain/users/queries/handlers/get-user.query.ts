import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl';
import { User } from '../../entities';
import { UserRepository } from '../../repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, User> {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    public async execute(query: GetUserQuery): Promise<User> {
        const { userId } = query;

        const data = await this.userRepository.getUserById(userId);

        if (isNil(data)) {
            throw new NotFoundException('The user was not found!');
        }

        return data;
    }
}
