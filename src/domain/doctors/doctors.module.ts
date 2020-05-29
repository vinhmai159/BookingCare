import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';
import { Doctor } from './entities';
import { DoctorServiceToken } from './constants';

const serviceProviders = [
  {
    provide: DoctorServiceToken,
    useClass: DoctorService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, DoctorRepository])],
  controllers: [DoctorController],
  providers: [...serviceProviders],
})
export class DoctorsModule {}
