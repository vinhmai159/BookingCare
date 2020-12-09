import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from '../../users';

@Entity('MedicalRecord', {
    orderBy: {
        createAt: 'ASC'
    }
})
export class MedicalRecord extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    symptoms: string;

    @Column()
    diagnostic: string;

    @Column()
    prescription: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
