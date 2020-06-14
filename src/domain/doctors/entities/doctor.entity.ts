import {
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ObjectIdColumn,
  Entity,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('doctor')
export class Doctor {
  @PrimaryColumn()
  id: string;

  @Column()
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
