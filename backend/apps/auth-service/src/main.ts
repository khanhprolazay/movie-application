import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService, Service, ExceptionFilter, QUEUE } from '@app/shared';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

dotenv.config({
  path: `config/env/${process.env.NODE_ENV}.env`
});

async function bootstrap() {
  const brokerHost = process.env.BROKER_HOST;
  const brokerPort = process.env.BROKER_PORT;
  const brokerUsername = process.env.BROKER_USERNAME;
  const brokerPassword = process.env.BROKER_PASSWORD;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${brokerUsername}:${brokerPassword}@${brokerHost}:${brokerPort}`],
        queue: QUEUE.AUTH,
        queueOptions: {
          durable: false,
        },
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
