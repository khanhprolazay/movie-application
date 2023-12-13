import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServiceSerializer } from './interceptor';

dotenv.config({
  path: `config/env/${process.env.NODE_ENV}.env`
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:3000', 'https://movie.ledangminh.id.vn'] });
  app.useGlobalInterceptors(new ServiceSerializer());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const config = new DocumentBuilder()
    .setTitle("Movie API Documentation")
    .setDescription("Learn how to use this api")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
