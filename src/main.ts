import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppconfigService } from './config/appconfig.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppconfigService);
  const config = configService.getConfig();

  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(config.port);
}
bootstrap();
