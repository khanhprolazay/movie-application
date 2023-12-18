import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE, Service } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import { ReportController } from './report.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Service.REPORT,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const brokerHost = configService.get('BROKER_HOST');
          const brokerPort = configService.get('BROKER_PORT');
          const brokerVhost = configService.get('BROKER_VHOST');
          const brokerUsername = configService.get('BROKER_USERNAME');
          const brokerPassword = configService.get('BROKER_PASSWORD');

          return {
            name: Service.REPORT,
            transport: Transport.RMQ,
            options: {
              urls: [
                `amqp://${brokerUsername}:${brokerPassword}@${brokerHost}:${brokerPort}/${brokerVhost}`,
              ],
              queue: QUEUE.REPORT,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
