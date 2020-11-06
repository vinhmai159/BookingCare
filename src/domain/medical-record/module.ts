import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commandMedicalRecordHandlers } from './commands';
import { MedicalRecordServiceToken } from './constants';
import { MedicalRecordController } from './controllers';
import { MedicalRecord } from './entities';
import { MedicalRecordRepository } from './repositories';
import { MedicalRecordService } from './services';
import { CqrsModule } from '@nestjs/cqrs';

const serviceProviders = [
    {
        provide: MedicalRecordServiceToken,
        useClass: MedicalRecordService
    }
];

@Module({
    imports: [TypeOrmModule.forFeature([MedicalRecord, MedicalRecordRepository]), CqrsModule],
    controllers: [MedicalRecordController],
    providers: [...serviceProviders, ...commandMedicalRecordHandlers],
    exports: []
})
export class MedicalRecordModule {}
