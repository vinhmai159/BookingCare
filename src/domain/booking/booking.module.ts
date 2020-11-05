import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingServiceToken } from './constants';
import { BookingController } from './controllers/booking.controller';
import { Booking } from './entities';
import { BookingRepository } from './repositories';
import { BookingService } from './services';

const serviceProvides = [
    {
        provide: BookingServiceToken,
        useClass: BookingService
    }
];

@Module({
    imports: [TypeOrmModule.forFeature([Booking, BookingRepository]), CqrsModule],
    controllers: [BookingController],
    providers: [...serviceProvides],
    exports: []
})
export class BookingModule {}
