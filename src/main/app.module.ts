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
      username: 'b6bc348d96cbe6',
      password: 'a0da6a7d',
      host: 'us-cdbr-east-05.cleardb.net',
      port: 3306,
      database: 'heroku_61091f0781ef19e',
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
