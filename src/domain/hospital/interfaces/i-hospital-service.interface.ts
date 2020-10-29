import { Hospital } from '../entities';
import { DeleteResult } from 'typeorm';

export interface IHospitalService {
    createHospital(hospital: Hospital): Hospital | Promise<Hospital>;

    getHospitals(name?: string): [Hospital[], number] | Promise<[Hospital[], number]>;

    deleteHospital(id: string): Promise<DeleteResult>;

    updateHospital(id: string, hospital: Hospital): Hospital | Promise<Hospital>;
}
