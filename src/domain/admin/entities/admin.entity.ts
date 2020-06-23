import { Entity, PrimaryColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('admin')
export class Admin {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({ default: null})
    name: string;

    @Column({ default: null})
    phoneNumber: string;

    @CreateDateColumn({type: 'timestamp'})
    createAt: Date;

    @CreateDateColumn({type: 'timestamp'})
    updateAt: Date;

    @BeforeInsert()
    async hashPassword(): Promise<any> {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
    }
}
