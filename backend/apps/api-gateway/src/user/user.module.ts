import { QUEUE, Service } from '@app/shared';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: Service.USER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const brokerHost = configService.get("BROKER_HOST");
        const brokerPort = configService.get("BROKER_PORT");
        const brokerVhost = configService.get("BROKER_VHOST");
        const brokerUsername = configService.get("BROKER_USERNAME");
        const brokerPassword = configService.get("BROKER_PASSWORD");
        const brokerMessageTtl = configService.get("BROKER_MESSAGE_TTL");
        
        return {
          name: Service.USER,
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${brokerUsername}:${brokerPassword}@${brokerHost}:${brokerPort}/${brokerVhost}`],
            queue: QUEUE.USER,
            queueOptions: {
              durable: false,
              messageTtl: brokerMessageTtl,
            },
          }
        }
      }
    }])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
