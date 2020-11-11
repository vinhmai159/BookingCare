import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity('Category', {
    orderBy: {
        createAt: 'DESC'
    }
})
export class Category extends BaseEntity {
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