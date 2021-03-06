import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as Moment from 'moment';
import { DeleteResult } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { GetScheduleByIdQuery, SaveScheduleQuery, Schedule } from '../../schedules';
import { User } from '../entities';
import { IUserService } from '../interfaces';
import { UserRepository } from '../repositories';
import { isNil } from 'lodash';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly queryBus: QueryBus
    ) {}

    public async createUser(user: User): Promise<User> {
        const existedUser = await this.userRepository.getUserByEmail(user.email);

        if (existedUser !== undefined && existedUser !== null) {
            throw new BadRequestException('That email  was existed.');
        }

        user.id = uuid();
        return await this.userRepository.saveUser(user);
    }

    public async getUsers(data?: string): Promise<[User[], number]> {
        const [existedData, total] = await this.userRepository.getUsers(data);
        return [existedData, total];
    }

    public async getUserById(userId: string): Promise<any> {
        const data = await this.userRepository.getUserById(userId);

        const { id, email, fistName, lastName, birthday, address, gender } = data;

        const result = {
            id,
            email,
            fistName,
            lastName,
            birthday,
            address,
            gender
        };

        return result;
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
            exitsUser.birthday = Moment(user.birthday).toDate();;
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
        // const user = await this.userRepository.getUserById(id);
        // // dùng query bus qua bên Schedule đẻ lấy, k dc impỏt repossiroty ỏ ngoài domain của nó
        // const schedule = await this.queryBus.execute<GetScheduleByIdQuery, Schedule>(
        //     new GetScheduleByIdQuery(scheduleId)
        // );

        // if (!isNil(user.schedule)) {
        //     throw new BadRequestException('Can not booking schedule, You have a schedule.');
        // }

        // if (schedule.busy) {
        //     throw new BadRequestException('The schedule of doctor is busy');
        // }

        // const current = new Date();
        // const hourCurrentString = Moment(current).format('hh');

        // const hourCurrent = Number(hourCurrentString);

        // const exitTimeSlot = schedule.calender.timeslot.name;

        // const timeSlotArr = exitTimeSlot.split(':');

        // const timeSlot = Number(timeSlotArr[0]);

        // if (timeSlot < hourCurrent - 2) {
        //     throw new BadRequestException('Can not booking the schedule for doctor');
        // }

        // user.schedule = schedule;
        // await this.userRepository.saveUser(user);
        // schedule.busy = true;
        // await this.queryBus.execute<SaveScheduleQuery, Schedule>(new SaveScheduleQuery(schedule)); // save
        // return schedule;
        return null;
    }

    public async userLogin(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.userRepository.getUserByEmail(email);
        if (user && (await this.validatePassword(password, user.password))) {
            const { id, email, address, gender, birthday, fistName, lastName, createAt, updateAt } = user;
            const role = 'user';
            const payload = {
                id,
                email,
                address,
                gender,
                birthday,
                fistName,
                lastName,
                role,
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
