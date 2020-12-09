import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, AuthMode, DoctorGuard, jwt, UserGuard } from '../../../common';
import { Doctor } from '../../doctors';
import { User } from '../../users';
import { BookingServiceToken } from '../constants';
import { BookingQueryDto, CompleteMedicalRecordQueryDto, CreateMedicalRecordDto, ScheduleQueryDto } from '../dto';
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
    @Auth([AuthMode.USER_GUARD])
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
    @Auth([AuthMode.USER_GUARD, AuthMode.DOCTOR_GUARD])
    @Get('/get-one')
    public async getBooking(@Query() dto: BookingQueryDto): Promise<Booking> {
        const data = await this.bookingService.getBooking(dto.bookingId, dto.scheduleId);

        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: [Booking],
        description: 'get schedule were Booked is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Auth([AuthMode.DOCTOR_GUARD])
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
    @Auth([AuthMode.DOCTOR_GUARD])
    @Put('/complete-medical-record')
    public async updateStatus(
        @Query() queryDto: CompleteMedicalRecordQueryDto,
        @Body() bodyDto: CreateMedicalRecordDto
    ): Promise<Booking> {
        bodyDto.validate(queryDto.status);
        const data = await this.bookingService.updateStatus(queryDto.bookingId, queryDto.scheduleId, queryDto.status, bodyDto.toEntity());

        return data;
    }
}
