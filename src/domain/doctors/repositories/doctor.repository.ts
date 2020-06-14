import { EntityRepository, Repository, DeleteResult, MongoRepository } from 'typeorm';
import { Doctor } from '../entities';
import {IdDoctorParamDto, UpdateDoctorQueryDto} from '../dto';

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> {
  async getDoctors(name: string): Promise<Doctor[]> {
    const doctor = this.createQueryBuilder('doctor');

    if (name) {
      doctor.andWhere('doctor.fistName = :name OR doctor.lastName = :name', {
        name: `%${name}%`,
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
    const doc = await this.getDoctorById(id);
    doc.fistName = doctor.fistName;
    doc.lastName = doctor.lastName;
    // doc.avatar = doctor.avat
    doc.description = doctor.description;
    doc.addressDetail = doc.addressDetail;
    return this.save(doc);
  }

  async getDoctorByEmail(email: string): Promise<Doctor> {
    return await this.createQueryBuilder('doctor')
                      .where('doctor.email LIKE :email', {email})
                      .getOne();
  }
}
