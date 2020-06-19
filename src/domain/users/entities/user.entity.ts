import { Entity, PrimaryColumn, Column, CreateDateColumn, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Schedule } from '../../schedules';

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

    @Column()
    birthday: Date;

    @Column()
    address: string;

    @Column()
    gender: string;

    @OneToOne(() => Schedule)
    @JoinColumn()
    schedule: Schedule;

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
