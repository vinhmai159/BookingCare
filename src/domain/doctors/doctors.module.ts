import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';
import { Doctor } from './entities';
import { DoctorServiceToken } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { DoctorQueryHandlers } from './queries/handlers';

const serviceProviders = [
    {
        provide: DoctorServiceToken,
        useClass: DoctorService
    }
];

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'bookingcare',
            signOptions: {
                expiresIn: 3600 * 24
            }
        }),
        TypeOrmModule.forFeature([Doctor, DoctorRepository]),
        CqrsModule
    ],
    controllers: [DoctorController],
    providers: [...serviceProviders, ...DoctorQueryHandlers],
    exports: [...serviceProviders]
})
export class DoctorsModule {}
