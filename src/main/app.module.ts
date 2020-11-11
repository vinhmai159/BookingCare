import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorInterceptor, LoggingInterceptor } from '../common';
import {
    AdminModule,
    DoctorsModule,
    ExpertiseModule,
    SchedulesModule,
    UserModule,
    BookingModule,
    MedicalRecordModule,
    ArticleModel
} from '../domain';
import { HospitalModule } from '../domain/hospital/hospital.module';
import { AppController } from './controllers';
import { AppService } from './services';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            username: 'root',
            password: 'root',
            host: 'localhost',
            port: 8889,
            database: 'booking-care',
            // entities: [Doctor],
            entities: [__dirname + '/../../**/*.entity.{js,ts}'],
            synchronize: true,
            logging: true
            // username: 'bbdfg5cw2f98vgj9',
            // password: 'v3z225u0dmatpsxl',
            // host: 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            // port: 3306,
            // database: 'fldp0ibaovxicq3r',
            // entities: [Doctor, Calender, Schedule, TimeSlot, User, Admin, Expertise],
            // // entities: [__dirname + '/../../**/*.entity.{js,ts}'],
            // synchronize: flase,
            // logging: true
        }),
        DoctorsModule,
        SchedulesModule,
        UserModule,
        ExpertiseModule,
        HospitalModule,
        BookingModule,
        MedicalRecordModule,
        ArticleModel,
        AdminModule
    ],
    controllers: [AppController],
    providers: [AppService, LoggingInterceptor, ErrorInterceptor]
})
export class AppModule {}
