import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('timeslot')
export class TimeSlot {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true})
    name: string;

    @Column({
        type: 'float'
    })
    start: number;

    @Column({
        type: 'float'
    })
    end: number;

    @CreateDateColumn({ type: 'timestamp' })
    public createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updateAt: Date;

    @Column({ type: 'timestamp', default: null })
    public deletedAt: Date;
}
