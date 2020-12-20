import { User } from '../entities';
import { DeleteResult } from 'typeorm';
import { Schedule } from '../../schedules/entities/schedule.entity';
export interface IUserService {
    createUser(user: User): Promise<User>;

    getUsers(data?: string): Promise<[User[], number]>;

    getUserById(id: string): Promise<User>;

    updateUser(id: string, user: User): Promise<User>;

    deleteUser(Id: string): Promise<DeleteResult>;

    bookingSchedule(id: string, scheduleId: string): Promise<Schedule>;

    userLogin(email: string, password: string): Promise<{ accessToken: string}>;
}