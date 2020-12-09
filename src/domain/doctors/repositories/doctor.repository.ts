import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Doctor } from '../entities';
import { UpdateDoctorQueryDto } from '../dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { isNull, isUndefined } from 'lodash';

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> {
    async getDoctors(name?: string, expertise?: string, hospital?: string): Promise<Doctor[]> {
        const doctor = this.createQueryBuilder('doctor')
            .leftJoinAndSelect('doctor.expertise', 'expertise')
            .leftJoinAndSelect('doctor.hospital', 'hospital');

        if (!isNull(name) && !isUndefined(name)) {
            doctor.andWhere('(doctor.fistName LIKE :name OR doctor.lastName LIKE :name)', {
                name: `%${name}%`
            });
        }

        if (!isNull(expertise) && !isUndefined(expertise)) {
            doctor.andWhere('expertise.name LIKE :expertise', {
                expertise: `%${expertise}%`
            });
        }

        if (!isNull(hospital) && !isUndefined(hospital)) {
            doctor.andWhere('hospital.name LIKE :hospital', {
                hospital: `%${hospital}%`
            });
        }

        return await doctor.getMany();
    }

    async getDoctorById(id: string): Promise<Doctor> {
        return await this.createQueryBuilder('doctor')
            .leftJoinAndSelect('doctor.expertise', 'expertise')
            .leftJoinAndSelect('doctor.hospital', 'hospital')
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

    async getDoctorByEmail(email: string): Promise<Doctor> {
        return await this.createQueryBuilder('doctor')
            .where('doctor.email LIKE :email', { email })
            .getOne();
    }
}
