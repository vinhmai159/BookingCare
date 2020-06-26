import { Schedule } from '../../../schedules';

export class SaveScheduleQuery {
    constructor(public readonly schedule: Schedule) {}
}