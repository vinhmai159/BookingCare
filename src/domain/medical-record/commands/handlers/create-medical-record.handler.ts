import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { GetUserQuery, User } from '../../../users';
import { MedicalRecord } from '../../entities';
import { MedicalRecordRepository } from '../../repositories';
import { CreateMedicalRecordCommand } from '../impl';

@CommandHandler(CreateMedicalRecordCommand)
export class CreateMedicalRecordHandler implements ICommandHandler<CreateMedicalRecordCommand, MedicalRecord> {
    constructor(
        @InjectRepository(MedicalRecordRepository)
        private readonly medicalRecordRepository: MedicalRecordRepository,
        private readonly queryBus: QueryBus
    ) {}

    public async execute(command: CreateMedicalRecordCommand): Promise<MedicalRecord> {
        const { userId, medicalRecord } = command;

        const user = await this.queryBus.execute<GetUserQuery, User>(new GetUserQuery(userId));

        medicalRecord.id = uuid();
        medicalRecord.user = user;

        await this.medicalRecordRepository.save(medicalRecord);

        return medicalRecord;
    }
}
