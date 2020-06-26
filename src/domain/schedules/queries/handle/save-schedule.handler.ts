import { QueryHandler, IQueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveScheduleQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleRepository } from '../../repositories';
import {Schedule} from '../../entities';

@QueryHandler(SaveScheduleQuery)
export class SaveScheduleHandler implements ICommandHandler<SaveScheduleQuery> {
    constructor(
        @InjectRepository(ScheduleRepository)
        private readonly scheduleReposittory: ScheduleRepository
    ) {}

    async execute(query: SaveScheduleQuery): Promise<Schedule> {
        return await this.saveSchedule(query.schedule);
    }

    public async saveSchedule(schedule: Schedule): Promise<Schedule> {
        return await this.scheduleReposittory.createSchedule(schedule);
    }
}
