import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { DoctorRepository } from '../repositories/doctor.repository';
import { IDoctorService } from '../interfaces';
import { Doctor } from '../entities';
import {DeleteResult} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DoctorService implements IDoctorService {
    constructor(
        @InjectRepository(DoctorRepository)
        private readonly doctorRepository: DoctorRepository,
    ) {}
    async createDoctor(doctor: Doctor):  Promise<Doctor> {
        doctor.id = uuid();
        return await this.doctorRepository.createDoctor(doctor);
    }
    async getDoctorById(id: string): Promise<Doctor> {
        return await this.doctorRepository.getDoctorById(id);
    }
    async getDoctors(name: string): Promise<Doctor[]> {
        return await this.doctorRepository.getDoctors(name);
    }
    async deleteDoctor(id: string): Promise<DeleteResult> {
        return await this.doctorRepository.deleteDoctor(id);
    }
    async updateDoctor(doctor: Doctor): Promise<Doctor> {
        return await this.doctorRepository.updateDoctor(doctor.id, doctor);
    }
}
