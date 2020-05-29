import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DoctorsModule,
  SchedulesModule,
} from '../domain';

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
    }),
    DoctorsModule,
    SchedulesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
