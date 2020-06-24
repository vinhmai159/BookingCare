import { Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Doctor } from '../../doctors/';
import {Calender} from './calender.entity';
import { Expose } from 'class-transformer';
// import {User} from '../../users';

@Entity('schedule')
export class Schedule {
    @PrimaryColumn()
    id: string;

    @ManyToOne(type => Doctor)
    doctor: Doctor;

    @ManyToOne(type => Calender)
    calender: Calender;

    @Column({
        default: false
    })
    @Expose()
    busy: boolean;

    // @OneToOne(type => User, user => user.schedule)
    // user: User;

    @CreateDateColumn({ type: 'timestamp' })
    public createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updateAt: Date;
}
