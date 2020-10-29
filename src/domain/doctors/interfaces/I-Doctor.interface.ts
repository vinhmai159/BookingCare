import { Doctor } from '../entities/doctor.entity';
import { DeleteResult } from 'typeorm';
import { Schedule } from '../../schedules';
import {UpdateDoctorQueryDto, IdDoctorParamDto} from '../dto';
export interface IDoctorService {
    createDoctor(doctor: Doctor, path: string): Doctor | Promise<Doctor>;

    getDoctorById(id: string): Promise<Doctor>;

    getDoctors(name?: string, expertise?: string, hospital?: string): Promise<Doctor[]>;

    deleteDoctor(id: string): Promise<DeleteResult>;

    updateDoctor(id: string, doctor: UpdateDoctorQueryDto): Promise<Doctor>;

    doctorLogin(email: string, password: string): Promise<{ accessToken: string}>;

    saveDoctor(dotor: Doctor):Doctor | Promise<Doctor>;
}