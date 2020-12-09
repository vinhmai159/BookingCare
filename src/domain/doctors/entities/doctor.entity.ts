import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, Entity, JoinColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Expertise } from '../../expertise';
import { OneToOne } from 'typeorm';
import { Hospital } from '../../hospital';

@Entity('doctor')
export class Doctor {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    avatar: string;

    @Column()
    fistName: string;

    @Column()
    lastName: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column({
        nullable: true
    })
    addressDetail: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @ManyToOne(() => Expertise)
    @JoinColumn()
    expertise: Expertise;

    @ManyToOne(() => Hospital)
    @JoinColumn()
    hospital: Hospital;

    @CreateDateColumn({ type: 'timestamp' })
    public createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updateAt: Date;

    @BeforeInsert()
    async hashPassword(): Promise<any> {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
    }
}
