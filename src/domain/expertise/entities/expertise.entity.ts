import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('expertise')
export class Expertise {
    @PrimaryColumn()
    @Expose()
    id: string;

    @Column({ unique: true })
    @Expose()
    name: string;

    @CreateDateColumn()
    createAt: Date;

    @CreateDateColumn()
    updateAt: Date;
}
