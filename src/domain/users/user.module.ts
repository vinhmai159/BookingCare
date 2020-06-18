import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { UserServiceToken } from './contants';
import { User } from './entities';
import { UserRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';

const serviceProvides = [
    {
        provide: UserServiceToken,
        useClass: UserService
    }
];

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRepository])],
    controllers: [UserController],
    providers: [...serviceProvides],
    exports: []
})
export class UserModule {}
