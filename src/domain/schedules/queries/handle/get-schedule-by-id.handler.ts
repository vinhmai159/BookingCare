import { QueryHandler, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetScheduleByIdQuery } from '../impl';
import { ScheduleRepository } from '../../repositories';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Schedule} from 'domain/schedules/entities';

@QueryHandler(GetScheduleByIdQuery)
export class GetScheduleByIdHandler implements IQueryHandler<GetScheduleByIdQuery> {
    constructor(
        @InjectRepository(ScheduleRepository)
        private readonly scheduleReposittory: ScheduleRepository
    ) {
        // super(loggerService)
    }

    public async execute(query: GetScheduleByIdQuery) {
        return await this.getScheduleById(query.doctorId);
    }

    public async getScheduleById(userId: string): Promise<Schedule> {
        const schedule = await this.scheduleReposittory.getScheduleById(userId);
        if (!schedule) {
            throw new BadRequestException('USER_NOT_FOUND_ERROR');
        }
        return schedule;
    }

}
