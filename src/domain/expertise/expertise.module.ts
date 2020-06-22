import { Module } from '@nestjs/common';
import { ExpertiseServiceToken } from './contants';
import {ExpertiseService} from './service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Expertise} from './entities';
import {ExpertiseRepository} from './repositories';
import {ExpertiseController} from './controllers/expertise.controller';

const serviceProviders = [
    {
        provide: ExpertiseServiceToken,
        useClass: ExpertiseService
    }
];

@Module({
    imports: [TypeOrmModule.forFeature([Expertise, ExpertiseRepository])],
    controllers: [ExpertiseController],
    providers: [...serviceProviders],
    exports: [...serviceProviders]
})
export class ExpertiseModule {}
