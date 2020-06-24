import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DoctorsModule,
  SchedulesModule,
  UserModule,
  ExpertiseModule,
  AdminModule,
} from '../domain';
import {LoggingInterceptor, ErrorInterceptor} from '../common';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'bbdfg5cw2f98vgj9',
      password: 'v3z225u0dmatpsxl',
      host: 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      port: 3306,
      database: 'fldp0ibaovxicq3r',
      // entities: [Doctor],
      entities: [__dirname + '/../../**/*.entity.{js,ts}'],
      synchronize: true,
      logging: true
    }),
    DoctorsModule,
    SchedulesModule,
    UserModule,
    ExpertiseModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService, LoggingInterceptor, ErrorInterceptor],
})
export class AppModule {}
