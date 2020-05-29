import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentationModule } from './modules';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  DocumentationModule.load(app);

  await app.listen(3069);
}
bootstrap();
