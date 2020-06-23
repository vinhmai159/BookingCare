import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { DoctorRepository } from '../repositories/doctor.repository';
import { IDoctorService } from '../interfaces';
import { Doctor } from '../entities';
import {DeleteResult} from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {UpdateDoctorQueryDto, IdDoctorParamDto} from '../dto';

@Injectable()
export class DoctorService implements IDoctorService {
    constructor(
        @InjectRepository(DoctorRepository)
        private readonly doctorRepository: DoctorRepository,
        private readonly jwtService: JwtService
    ) {}
    async createDoctor(doctor: Doctor, path: string):  Promise<Doctor> {
        doctor.id = uuid();
        doctor.avatar = path;
        return await this.doctorRepository.createDoctor(doctor);
    }
    async getDoctorById(id: string): Promise<Doctor> {
        const doctor =  await this.doctorRepository.getDoctorById(id);
        return doctor;
    }
    async getDoctors(name?: string, expertise?: string): Promise<Doctor[]> {
        const doctor = await this.doctorRepository.getDoctors(name, expertise);
        return doctor;
    }
    async deleteDoctor(id: string): Promise<DeleteResult> {
        return await this.doctorRepository.deleteDoctor(id);
    }
    async updateDoctor(id: string, doctor: UpdateDoctorQueryDto): Promise<Doctor> {
        return await this.doctorRepository.updateDoctor(id, doctor);
    }
    async doctorLogin(email: string, password: string): Promise<{ accessToken: string}> {
        const doctor = await this.doctorRepository.getDoctorByEmail(email);
        if ( doctor && await this.validatePassword(password, doctor.password)) {
            const {
                id,
                email,
                addressDetail,
                description,
                fistName,
                lastName,
                createAt,
                updateAt
            } = doctor;
            const payload = {
                id,
                email,
                addressDetail,
                description,
                fistName,
                lastName,
                createAt,
                updateAt
            }
            const accessToken = await this.jwtService.sign(payload)
            return {accessToken, ...payload}
        }
        throw new UnauthorizedException('INVALID EMAIL OR PASSWORD!');
    }

    async validatePassword(password: string, passwordHashed: string): Promise<boolean> {
        return await bcrypt.compare(password,passwordHashed);
    }

    async saveDoctor(dotor: Doctor): Promise<Doctor> {
        return await this.doctorRepository.createDoctor(dotor);
    }
}
