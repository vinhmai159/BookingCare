import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity('Tag', {
    orderBy: {
        createAt: 'DESC'
    }
})
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        type: 'varchar',
        length: 255
    })
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
