import { Module } from '@nestjs/common';
import { HospitalServiceToken } from './contants';
import { HospitalService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './entities';
import { HospitalRepository } from './repositories';
import { HospitalController } from './controllers';

const serviceProviders = [
    {
        provide: HospitalServiceToken,
        useClass: HospitalService
    }
];

@Module({
    imports: [TypeOrmModule.forFeature([Hospital, HospitalRepository])],
    controllers: [HospitalController],
    providers: [...serviceProviders],
    exports: [...serviceProviders]
})
export class HospitalModule {}
