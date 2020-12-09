import { Module } from '@nestjs/common';
import { HospitalServiceToken } from './contants';
import { HospitalService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './entities';
import { HospitalRepository } from './repositories';
import { HospitalController } from './controllers';
import { DoctorQueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';

const serviceProviders = [
    {
        provide: HospitalServiceToken,
        useClass: HospitalService
    }
];

@Module({
    imports: [TypeOrmModule.forFeature([Hospital, HospitalRepository]), CqrsModule],
    controllers: [HospitalController],
    providers: [...serviceProviders, ...DoctorQueryHandlers],
    exports: [...serviceProviders]
})
export class HospitalModule {}
