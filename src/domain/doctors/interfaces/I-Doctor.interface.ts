import { DeleteResult } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';
export interface IDoctorService {
    createDoctor(doctor: Doctor, path: string, expertiseId: string, hospitalId: string): Doctor | Promise<Doctor>;

    getDoctorById(id: string): Promise<Doctor>;

    getDoctors(name?: string, expertise?: string, hospital?: string): Promise<Doctor[]>;

    deleteDoctor(id: string): Promise<DeleteResult>;

    updateDoctor(id: string, doctor: Doctor): Promise<Doctor>;

    doctorLogin(email: string, password: string): Promise<{ accessToken: string }>;

    saveDoctor(dotor: Doctor): Doctor | Promise<Doctor>;
}
