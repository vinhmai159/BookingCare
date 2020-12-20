import { User } from '../../users';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import { BookingStatus } from '../constants';
import { Schedule } from '../../schedules';

@Entity('Booking')
export class Booking extends BaseEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    status: BookingStatus;

    @Column({ type: 'timestamp', default: null })
    date: Date;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Schedule)
    @JoinColumn()
    schedule: Schedule;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
