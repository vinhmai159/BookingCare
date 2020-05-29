import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { DayOfWeek } from '../constants/index';
import {IsEnum} from 'class-validator';
import {TimeSlot} from './timeSlot.entity';

@Entity('calender')
export class Calender {
    @PrimaryColumn()
    id: string;

    @ManyToOne(type => TimeSlot)
    @JoinColumn()
    timeslot: TimeSlot;

    @Column()
    @IsEnum(DayOfWeek)
    day: DayOfWeek;
}