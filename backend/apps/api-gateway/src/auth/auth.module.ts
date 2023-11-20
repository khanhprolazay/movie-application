import { QUEUE, Service } from '@app/shared';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: Service.AUTH,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const brokerHost = configService.get("BROKER_HOST");
        const brokerPort = configService.get("BROKER_PORT");
        const brokerUsername = configService.get("BROKER_USERNAME");
        const brokerPassword = configService.get("BROKER_PASSWORD");

        return {
          name: Service.AUTH,
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${brokerUsername}:${brokerPassword}@${brokerHost}:${brokerPort}`],
            queue: QUEUE.AUTH,
            queueOptions: {
              durable: false,
            },
          }
        }
      }
    }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
