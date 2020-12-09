import { Injectable, UnauthorizedException, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorRepository } from '../repositories/doctor.repository';
import { IDoctorService } from '../interfaces';
import { Doctor } from '../entities';
import { DeleteResult } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateDoctorQueryDto, IdDoctorParamDto } from '../dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetExpertiseQuery, Expertise } from '../../expertise';
import { Hospital, GetHospitalQuery } from '../../hospital';
import { isNil } from 'lodash';

@Injectable()
export class DoctorService implements IDoctorService {
    constructor(
        @InjectRepository(DoctorRepository)
        private readonly doctorRepository: DoctorRepository,
        private readonly jwtService: JwtService,
        private readonly queryBus: QueryBus
    ) {}
    async createDoctor(doctor: Doctor, path: string, expertiseId: string, hospitalId: string): Promise<Doctor> {
        doctor.id = uuid();
        doctor.avatar = path;

        if (!isNil(expertiseId)) {
            const expertise = await this.queryBus.execute<GetExpertiseQuery, Expertise>(new GetExpertiseQuery(expertiseId));
            doctor.expertise = expertise;
        }

        if(!isNil(hospitalId)) {
            const hospital = await this.queryBus.execute<GetHospitalQuery, Hospital>(new GetHospitalQuery(hospitalId));
            doctor.expertise = hospital;
        }

        return await this.doctorRepository.createDoctor(doctor);
    }
    async getDoctorById(id: string): Promise<Doctor> {
        const doctor = await this.doctorRepository.getDoctorById(id);
        return doctor;
    }
    async getDoctors(name?: string, expertise?: string, hospital?: string): Promise<Doctor[]> {
        const doctor = await this.doctorRepository.getDoctors(name, expertise, hospital);
        return doctor;
    }
    async deleteDoctor(id: string): Promise<DeleteResult> {
        return await this.doctorRepository.deleteDoctor(id);
    }

    async updateDoctor(id: string, doctor: Doctor): Promise<Doctor> {
        const exitedDoctor = await this.doctorRepository.getDoctorById(id);

        if (isNil(exitedDoctor)) {
            throw new NotFoundException('Doctor was not found!');
        }

        doctor.id = exitedDoctor.id;

        return await this.doctorRepository.save(doctor);
    }
    async doctorLogin(email: string, password: string): Promise<{ accessToken: string }> {
        const doctor = await this.doctorRepository.getDoctorByEmail(email);
        if (doctor && (await this.validatePassword(password, doctor.password))) {
            const { id, email, addressDetail, description, fistName, lastName, createAt, updateAt } = doctor;
            const role = 'doctor';
            const payload = {
                id,
                email,
                addressDetail,
                description,
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

    async saveDoctor(dotor: Doctor): Promise<Doctor> {
        return await this.doctorRepository.createDoctor(dotor);
    }
}
