import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot, Calender, Schedule } from './entities';
import { TimeSlotRepository, CalenderRepository, ScheduleRepository } from './repositories';
import { TimeslotService, CalenderService, ScheduleService } from './services';
import { TimeSlotServiceToken, CalenderServiceToken, ScheduleServiceToken } from './constants';
import { TimeSlotController, CalenderController, ScheduleController } from './controllers';
import { DoctorService } from '../doctors/services/doctor.service';
import { IDoctorService } from '../doctors/interfaces/I-Doctor.interface';
import { Doctor } from '../doctors/entities/doctor.entity';
import { DoctorServiceToken } from '../doctors/constants';
import { DoctorRepository } from '../doctors/repositories/doctor.repository';
import { ScheduleCommandHandlers } from './queries/handle';
import { CqrsModule } from '@nestjs/cqrs';

const serviceProviders = [
    {
        provide: TimeSlotServiceToken,
        useClass: TimeslotService
    },
    {
        provide: CalenderServiceToken,
        useClass: CalenderService
    },
    {
        provide: ScheduleServiceToken,
        useClass: ScheduleService
    }
];

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TimeSlot,
            TimeSlotRepository,
            Calender,
            CalenderRepository,
            Schedule,
            ScheduleRepository,
            Doctor,
            DoctorRepository
        ]),
        CqrsModule
    ],
    controllers: [TimeSlotController, CalenderController, ScheduleController],
    providers: [...serviceProviders, ...ScheduleCommandHandlers],
    exports: [...serviceProviders]
})
export class SchedulesModule {}
