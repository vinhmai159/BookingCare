import { IsNotEmpty, IsUUID } from 'class-validator';

export class MedicalRecordParamDto {
    @IsNotEmpty()
    @IsUUID()
    medicalRecordId: string;
}
