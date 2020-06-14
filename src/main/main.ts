import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentationModule } from './modules';
import { HttpExceptionFilter } from '../common/exceptions';
import {ValidationPipe} from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  DocumentationModule.load(app);

  await app.listen(3069);
}
bootstrap();
