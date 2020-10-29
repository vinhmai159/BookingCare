import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalenderServiceToken, ScheduleServiceToken, TimeSlotServiceToken } from './constants';
import { CalenderController, ScheduleController, TimeSlotController } from './controllers';
import { Calender, Schedule, TimeSlot } from './entities';
import { ScheduleCommandHandlers } from './queries/handle';
import { CalenderRepository, ScheduleRepository, TimeSlotRepository } from './repositories';
import { CalenderService, ScheduleService, TimeslotService } from './services';

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
            // Doctor,
            // DoctorRepository
        ]),
        CqrsModule,
        // forwardRef(() => CalenderService)
    ],
    controllers: [TimeSlotController, CalenderController, ScheduleController],
    providers: [...serviceProviders, ...ScheduleCommandHandlers],
    exports: []
})
export class SchedulesModule {}
