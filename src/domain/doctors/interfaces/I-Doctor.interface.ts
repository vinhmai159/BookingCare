import { Doctor } from '../entities/doctor.entity';
import {DeleteResult} from 'typeorm';
export interface IDoctorService {
    createDoctor(doctor: Doctor): Doctor | Promise<Doctor>;

    getDoctorById(id: string): Promise<Doctor>;

    getDoctors(name: string): Promise<Doctor[]>;

    deleteDoctor(id: string): Promise<DeleteResult>;

    updateDoctor(doctor: Doctor): Promise<Doctor>;
}