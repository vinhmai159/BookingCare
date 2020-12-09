import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { Doctor } from '../../doctors';
import { Admin } from '../../admin';
import { AuthorType, ArticleStatus } from '../constants';

@Entity('Article', {
    orderBy: {
        createAt: 'DESC'
    }
})
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Doctor )
    @JoinColumn()
    doctor: Doctor;

    @Column({
        type: 'varchar',
        length: 255
    })
    title: string;

    @Column({
        type: 'longtext',
        nullable: true
    })
    content: string;

    @Column({
        type: 'varchar',
        length: 255,
        default: ArticleStatus.PENDING
    })
    status: ArticleStatus;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
