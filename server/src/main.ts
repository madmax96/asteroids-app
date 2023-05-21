import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Package from '../package.json';

const API_PREFIX = 'api';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: Config.NODE_ENV === 'dev',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(helmet());
  app.setGlobalPrefix(API_PREFIX);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Asteroids API')
    .setDescription('API for asteroids that are close to earch')
    .setVersion(Package.version)
    .addTag('asteroids')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document, { useGlobalPrefix: true });

  await app.listen(Config.HTTP_PORT);
}
bootstrap();
