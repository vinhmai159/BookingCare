import { Expose } from 'class-transformer';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import { Doctor } from '../../doctors/';
import { User } from '../../users';
import { Calender } from './calender.entity';

@Entity('schedule')
export class Schedule extends BaseEntity {
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

    @OneToOne(
        type => User,
        user => user.schedule
    )
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    public createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updateAt: Date;
}
