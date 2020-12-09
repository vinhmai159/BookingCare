import { Module } from '@nestjs/common';
import { ExpertiseServiceToken } from './contants';
import { ExpertiseService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expertise } from './entities';
import { ExpertiseRepository } from './repositories';
import { ExpertiseController } from './controllers/expertise.controller';
import { DoctorQueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';

const serviceProviders = [
    {
        provide: ExpertiseServiceToken,
        useClass: ExpertiseService
    }
];

@Module({
    imports: [TypeOrmModule.forFeature([Expertise, ExpertiseRepository]), CqrsModule],
    controllers: [ExpertiseController],
    providers: [...serviceProviders, ...DoctorQueryHandlers],
    exports: [...serviceProviders]
})
export class ExpertiseModule {}
