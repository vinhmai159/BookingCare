import { Expose } from 'class-transformer';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('Hospital')
export class Hospital extends BaseEntity {
    @PrimaryColumn()
    @Expose()
    id: string;

    @Column({ unique: true })
    @Expose()
    name: string;

    @Column({ nullable: true })
    @Expose()
    description: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
