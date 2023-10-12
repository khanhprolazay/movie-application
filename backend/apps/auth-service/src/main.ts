import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService, Service, ExceptionFilter } from '@app/shared';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

dotenv.config({
  path: `config/env/${process.env.NODE_ENV}.env`
});

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.BROKER_HOST],
        },
        consumer: {
          groupId: `${Service.AUTH}`,
        }
      }
    }
  ); 
  
  app.useGlobalPipes(new ValidationPipe({     
    whitelist: true,
    validateCustomDecorators: true,
  }));
  
  const logger = app.get<LoggerService>(LoggerService);
  app.useLogger(logger);
  app.useGlobalFilters(new ExceptionFilter(logger));

  await app.listen();
}
bootstrap();
