import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IUserService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories';
import { User } from '../entities';
import { DeleteResult } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Schedule } from '../../schedules/entities/schedule.entity';
import { ScheduleRepository } from '../../schedules';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as Moment from 'moment';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        @InjectRepository(ScheduleRepository)
        private readonly scheduleRepository: ScheduleRepository,
        private readonly jwtService: JwtService
    ) {}

    public async createUser(user: User): Promise<User> {
        const existedUser = await this.userRepository.getUserByEmail(user.email);

        if (existedUser !== undefined && existedUser !== null) {
            throw new BadRequestException('That email  was existed.');
        }

        user.id = uuid();
        return await this.userRepository.saveUser(user);
    }

    public async getUsers(name?: string, email?: string, address?: string): Promise<[User[], number]> {
        const [data, count] = await this.userRepository.getUsers(name, email, address);
        return [data, count];
    }

    public async getUserById(id: string): Promise<User> {
        const data = await this.userRepository.getUserById(id);
        return data;
    }

    public async updateUser(id: string, user: User): Promise<User> {
        const exitsUser = await this.userRepository.getUserById(id);

        if (!exitsUser) {
            throw new NotFoundException('The User is not Found');
        }

        user.id = exitsUser.id;
        if (user.fistName) {
            exitsUser.fistName = user.fistName;
        }

        if (user.lastName) {
            exitsUser.lastName = user.lastName;
        }

        if (user.address) {
            exitsUser.address = user.address;
        }

        if (user.birthday) {
            exitsUser.birthday = user.birthday;
        }

        if (user.gender) {
            exitsUser.gender = user.gender;
        }

        return await this.userRepository.saveUser(exitsUser);
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return await this.userRepository.deleteUser(id);
    }

    public async bookingSchedule(id: string, scheduleId: string): Promise<Schedule> {
        const user = await this.userRepository.getUserById(id);
        const schedule = await this.scheduleRepository.getScheduleById(scheduleId);

        if (schedule.busy) {
            throw new BadRequestException('The schedule of doctor is busy');
        }

        const current = new Date();
        const hourCurrentString = Moment(current).format('hh');

        const hourCurrent = Number(hourCurrentString);

        const exitTimeSlot = schedule.calender.timeslot.name;

        const timeSlotArr = exitTimeSlot.split(':');

        const timeSlot = Number(timeSlotArr[0]);

        if (timeSlot < hourCurrent - 2) {
            throw new BadRequestException('Can not booking the schedule for doctor');
        }

        user.schedule = schedule;
        await this.userRepository.saveUser(user);
        schedule.busy = true;
        await this.scheduleRepository.createSchedule(schedule); // save
        return schedule;
    }

    public async userLogin(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.userRepository.getUserByEmail(email);
        if (user && (await this.validatePassword(password, user.password))) {
            const { id, email, address, gender, birthday, fistName, lastName, schedule, createAt, updateAt } = user;
            const payload = {
                id,
                email,
                address,
                gender,
                birthday,
                fistName,
                lastName,
                schedule,
                createAt,
                updateAt
            };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken, ...payload };
        }
        throw new UnauthorizedException('INVALID EMAIL OR PASSWORD!');
    }

    async validatePassword(password: string, passwordHashed: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordHashed);
    }
}
