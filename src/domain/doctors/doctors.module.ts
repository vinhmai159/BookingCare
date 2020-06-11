import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';
import { Doctor } from './entities';
import { DoctorServiceToken } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

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
        TypeOrmModule.forFeature([Doctor, DoctorRepository])
    ],
    controllers: [DoctorController],
    providers: [...serviceProviders],
    exports: [...serviceProviders]
})
export class DoctorsModule {}
