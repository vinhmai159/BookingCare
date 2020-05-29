import { EntityRepository, Repository, DeleteResult, MongoRepository } from 'typeorm';
import { Doctor } from '../entities';

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

  async updateDoctor(id: string, doctor: Doctor): Promise<Doctor> {
    let doc = await this.getDoctorById(id);
    doc = doctor;
    return null;
    // return doc.save();
  }
}
