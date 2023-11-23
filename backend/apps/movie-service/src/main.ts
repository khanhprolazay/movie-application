import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionFilter, LoggerService, QUEUE } from '@app/shared';
import { ValidationPipe } from '@nestjs/common';

dotenv.config({
  path: `config/env/${process.env.NODE_ENV}.env`
});

async function bootstrap() {
  const brokerHost = process.env.BROKER_HOST;
  const brokerPort = process.env.BROKER_PORT;
  const brokerVhost = process.env.BROKER_VHOST;
  const brokerUsername = process.env.BROKER_USERNAME;
  const brokerPassword = process.env.BROKER_PASSWORD;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, 
      {
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${brokerUsername}:${brokerPassword}@${brokerHost}:${brokerPort}/${brokerVhost}`],
          queue: QUEUE.MOVIE,
          queueOptions: {
            durable: false,
          },
        }
      }
    );

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      validateCustomDecorators: true
    }));
    
    const logger = app.get<LoggerService>(LoggerService);
    app.useLogger(logger);
    app.useGlobalFilters(new ExceptionFilter(logger));  
    
    await app.listen();
}
bootstrap();
