import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { Expertise } from '../../entities';
import { ExpertiseRepository } from '../../repositories';
import { GetExpertiseQuery } from '../impl';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetExpertiseQuery)
export class GetExpertiseHandler implements IQueryHandler<GetExpertiseQuery, Expertise> {
    constructor(
        @InjectRepository(ExpertiseRepository)
        private readonly expertiseRepository: ExpertiseRepository
    ) {}

    public async execute(query: GetExpertiseQuery): Promise<Expertise> {
        const expertise = await this.expertiseRepository.getExpertiseById(query.id);

        if (isNil(expertise)) {
            throw new NotFoundException('This expertise was not found.');
        }

        return expertise;
    }
}
