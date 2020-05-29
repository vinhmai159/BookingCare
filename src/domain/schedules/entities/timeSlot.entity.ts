import {Entity, PrimaryColumn, Column} from 'typeorm';

@Entity('timeslot')
export class TimeSlot {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
}