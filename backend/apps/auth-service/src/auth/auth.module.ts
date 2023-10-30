import { v4 } from 'uuid';
import { Service } from '@app/shared';
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
      useFactory: (configService: ConfigService) => ({
        transport: Transport.KAFKA,
        options: {
          client: { 
            brokers: [configService.get<string>('BROKER_HOST')] 
          },
          consumer: { 
            groupId: `user-from-auth-service-${v4()}`,
          },
        },
      })
    }]),

    JwtModule.register({}),
],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
