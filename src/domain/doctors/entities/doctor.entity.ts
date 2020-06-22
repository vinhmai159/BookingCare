import {
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ObjectIdColumn,
  Entity,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Expertise} from '../../expertise';
import { OneToOne } from 'typeorm';

@Entity('doctor')
export class Doctor {
  @PrimaryColumn()
  id: string;

  @Column({ default: null})
  avatar: string;

  @Column()
  fistName: string;

  @Column()
  lastName: string;

  @Column()
  description: string;

  @Column()
  addressDetail: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToOne(() => Expertise)
  @JoinColumn()
  expertises: Expertise[];

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
