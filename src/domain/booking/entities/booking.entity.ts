import { User } from '../../users';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
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

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToOne(() => Schedule)
    @JoinColumn()
    schedule: Schedule;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
