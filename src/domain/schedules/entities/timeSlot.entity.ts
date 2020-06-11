import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('timeslot')
export class TimeSlot {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    public createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updateAt: Date;
}
