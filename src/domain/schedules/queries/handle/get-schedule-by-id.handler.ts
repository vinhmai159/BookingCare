import {BadRequestException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {Schedule} from 'domain/schedules/entities';
import {ScheduleRepository} from '../../repositories';
import {GetScheduleByIdQuery} from '../impl';

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
