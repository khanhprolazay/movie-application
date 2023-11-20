import { QUEUE, Service } from '@app/shared';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: Service.USER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const brokerHost = configService.get<string>('BROKER_HOST') ;
        const brokerPort = configService.get<string>('BROKER_PORT');
        const brokerUsername = configService.get<string>('BROKER_USERNAME');
        const brokerPassword = configService.get<string>('BROKER_PASSWORD');

        return {
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${brokerUsername}:${brokerPassword}@${brokerHost}:${brokerPort}`],
            queue: QUEUE.USER,
            queueOptions: {
              durable: false,
            },
          }
      }
      }
    }]),

    JwtModule.register({}),
],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
