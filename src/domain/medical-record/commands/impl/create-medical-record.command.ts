import { ICommand } from '@nestjs/cqrs';
import { MedicalRecord } from '../../entities';

export class CreateMedicalRecordCommand implements ICommand {
    constructor(public readonly userId: string, public readonly medicalRecord: MedicalRecord) {}
}
