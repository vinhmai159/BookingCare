import {Calender} from '../entities';
import { DeleteResult } from 'typeorm';
import {DayOfWeek} from '../constants';
import {SaveCalenderDataDto, UpdateCalenderBodyDto} from '../dto';

export interface ICalenderService {
    createCalender(calenderDto: SaveCalenderDataDto): Calender | Promise<Calender>;

    getCalender(name: string, day: DayOfWeek): Calender[] | Promise<Calender[]>;

    getCalenderById(id: string): Calender | Promise<Calender>;

    deleteCalender(id: string): Promise<DeleteResult>;

    updateCalender(id: string, calenderDto: UpdateCalenderBodyDto): Calender | Promise<Calender>;
}