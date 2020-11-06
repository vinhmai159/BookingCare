import { MedicalRecord } from '../entities';

export interface IMedicalRecordService {
    getMedicalRecord(id: string): MedicalRecord | Promise<MedicalRecord>;

    getMedicalRecords(userId: string): [MedicalRecord[], number] | Promise<[MedicalRecord[], number]>;
}
