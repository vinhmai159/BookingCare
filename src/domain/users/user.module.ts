import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceToken } from './contants';
import { UserController } from './controllers';
import { User } from './entities';
import { UserQueryHandlers } from './queries';
import { UserRepository } from './repositories';
import { UserService } from './services';

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
    providers: [...serviceProvides, ...UserQueryHandlers],
    exports: []
})
export class UserModule {}
