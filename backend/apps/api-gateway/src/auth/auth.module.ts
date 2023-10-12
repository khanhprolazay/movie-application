import { v4 } from 'uuid';
import { Service } from '@app/shared';
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
      useFactory: (configService: ConfigService) => ({
        transport: Transport.KAFKA,
        options: {
          client: { 
            brokers: [configService.get<string>('BROKER_HOST')] 
          },
          consumer: {
            groupId: `auth-from-api-gateway-${v4()}`,
          }
        }
      }), inject: [ConfigService]
    }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
