import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    TimeSlot,
    Calender
} from './entities';
import {
    TimeSlotRepository,
    CalenderRepository
} from './repositories';
import {TimeslotService, CalenderService} from './services';
import {TimeSlotServiceToken, CalenderServiceToken} from './constants';
import {TimeSlotController, CalenderController} from './controllers';

const serviceProviders = [
    {
      provide: TimeSlotServiceToken,
      useClass: TimeslotService,
    },
    {
        provide: CalenderServiceToken,
        useClass: CalenderService,
    },
  ];

@Module({
    imports: [TypeOrmModule.forFeature([
        TimeSlot, TimeSlotRepository,
        Calender, CalenderRepository
    ])],
    controllers: [TimeSlotController, CalenderController],
    providers: [...serviceProviders],

})
export class SchedulesModule {}
