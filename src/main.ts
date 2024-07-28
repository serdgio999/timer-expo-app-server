import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new ConsoleLogger();
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  await app.listen(3000);
  logger.log('Application was started on 3000 port');
}

bootstrap();
