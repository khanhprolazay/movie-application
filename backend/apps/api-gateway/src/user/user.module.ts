import { v4 } from 'uuid';
import { Service } from '@app/shared';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: Service.USER,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.KAFKA,
        options: {
          client: { 
            brokers: [configService.get<string>('BROKER_HOST')],
          },
          consumer: {
            groupId: `user-from-api-gateway-${v4()}`,
          }
        }
      }), inject: [ConfigService]
    }])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
