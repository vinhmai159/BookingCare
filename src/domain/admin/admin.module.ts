import { Module } from '@nestjs/common';
import { AdminServiceToken } from './contants';
import { AdminService } from './services';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities';
import { AdminRepository } from './repositories';
import { AdminController } from './controllers/admin.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AdminQueryHandlers } from './queries/handlers';

const serviceProviders = [
    {
        provide: AdminServiceToken,
        useClass: AdminService
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
        TypeOrmModule.forFeature([Admin, AdminRepository]),
        CqrsModule
    ],
    controllers: [AdminController],
    providers: [...serviceProviders, ...AdminQueryHandlers],
    exports: []
})
export class AdminModule {}
