import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import config from './config/schema';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = config.getProperties();
  const port = appConfig.port || 3001;

  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(port, () => {
    console.log(`Application is running on this port: ${port}`);
  });
}
bootstrap();
