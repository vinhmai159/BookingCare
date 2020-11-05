import { Controller, Get, HttpCode, HttpStatus, Inject, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DoctorGuard, jwt, UserGuard } from '../../../common';
import { Doctor } from '../../doctors';
import { User } from '../../users';
import {BookingServiceToken} from '../constants';
import { BookingQueryDto, ScheduleQueryDto, UpdateStatusQueryDto } from '../dto';
import { Booking } from '../entities';
import { IBookingService } from '../interfaces';

@ApiBearerAuth()
@ApiTags('/booking')
@Controller('/booking')
export class BookingController {
    constructor(
        @Inject(BookingServiceToken)
        private readonly bookingService: IBookingService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: Booking,
        description: 'Booking schedule is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard)
    @Post()
    public async createBooking(@jwt() user: User, @Query() dto: ScheduleQueryDto): Promise<Booking> {
        const data = await this.bookingService.createBooking(user.id, dto.scheduleId);

        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Booking,
        description: 'get schedule was Booked is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard)
    @Get('/get-one')
    public async getBooking(@jwt() user: User, @Query() dto: BookingQueryDto): Promise<Booking> {
        const data = await this.bookingService.getBooking(dto.bookingId, user.id, dto.scheduleId);

        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: [Booking],
        description: 'get schedule were Booked is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @UseGuards(DoctorGuard)
    @Get('/get-many')
    public async getBookings(@jwt() doctor: Doctor): Promise<Booking[]> {
        const data = await this.bookingService.getBookings(doctor.id);

        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Booking,
        description: 'update status of schedule was booked is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard || DoctorGuard)
    @Put('/:bookingId')
    public async updateStatus(@Query() dto: UpdateStatusQueryDto): Promise<Booking> {
        const data = await this.bookingService.updateStatus(dto.bookingId, dto.status);

        return data;
    }
}
