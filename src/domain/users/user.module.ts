import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { UserServiceToken } from './contants';
import { User } from './entities';
import { UserRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {CqrsModule} from '@nestjs/cqrs';

const serviceProvides = [
    {
        provide: UserServiceToken,
        useClass: UserService
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
        TypeOrmModule.forFeature([User, UserRepository]),
        CqrsModule
    ],
    controllers: [UserController],
    providers: [...serviceProvides],
    exports: []
})
export class UserModule {}
