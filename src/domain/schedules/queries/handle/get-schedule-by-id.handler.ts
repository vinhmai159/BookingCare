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
        private readonly scheduleRepository: ScheduleRepository
    ) {
        // super(loggerService)
    }

    public async execute(query: GetScheduleByIdQuery) {
        return await this.getScheduleById(query.scheduleId);
    }

    public async getScheduleById(scheduleId: string): Promise<Schedule> {
        const schedule = await this.scheduleRepository.getScheduleById(scheduleId);
        if (!schedule) {
            throw new BadRequestException('Schedule was not found!');
        }
        return schedule;
    }

}
