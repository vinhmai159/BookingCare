import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Doctor } from '../entities';
import { UpdateDoctorQueryDto } from '../dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> {
    async getDoctors(name?: string, expertise?: string): Promise<Doctor[]> {
        const doctor = this.createQueryBuilder('doctor').leftJoinAndSelect('doctor.expertise', 'expertise');

        if (name) {
            doctor.andWhere('doctor.fistName LIKE :name OR doctor.lastName LIKE :name', {
                name: `%${name}%`
            });
        }

        if (expertise) {
            doctor.andWhere('expertise.name LIKE :expertise', {
                expertise: `%${expertise}%`
            });
        }

        return await doctor.getMany();
    }

    async getDoctorById(id: string): Promise<Doctor> {
        return await this.createQueryBuilder('doctor')
            .where('doctor.id LIKE :id', { id })
            .getOne();
    }

    async createDoctor(doctor: Doctor): Promise<Doctor> {
        return await this.save(doctor);
    }

    async deleteDoctor(id: string): Promise<DeleteResult> {
        return await this.createQueryBuilder('doctor')
            .delete()
            .from(Doctor)
            .where('doctor.id LIKE :id', { id })
            .execute();
    }

    async updateDoctor(id: string, doctor: UpdateDoctorQueryDto): Promise<Doctor> {
        let doc;
        try {
            doc = await this.getDoctorById(id);
        } catch {
            throw new NotFoundException('Can not found a doctor');
        }
        doc.fistName = doctor.fistName;
        doc.lastName = doctor.lastName;
        // doc.avatar = doctor.avat
        doc.description = doctor.description;
        doc.addressDetail = doctor.addressDetail;
        doc.expertise = doctor.expertiseId;
        return this.save(doc);
    }

    async getDoctorByEmail(email: string): Promise<Doctor> {
        return await this.createQueryBuilder('doctor')
            .where('doctor.email LIKE :email', { email })
            .getOne();
    }
}
