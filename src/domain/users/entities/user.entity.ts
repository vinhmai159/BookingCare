import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn()
    @Expose()
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    fistName: string;

    @Column()
    lastName: string;

    @Column({
        type: 'date',
        nullable: true,
        default: null
    })
    birthday: Date;

    @Column({
        nullable: true
    })
    address: string;

    @Column({
        nullable: true
    })
    gender: string;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updateAt: Date;

    @BeforeInsert()
    async hashPassword(): Promise<any> {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
    }
}
