import { QUEUE, Service } from "@app/shared";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";

@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: Service.MOVIE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const brokerHost = configService.get("BROKER_HOST");
        const brokerPort = configService.get("BROKER_PORT");
        const brokerUsername = configService.get("BROKER_USERNAME");
        const brokerPassword = configService.get("BROKER_PASSWORD");

        return {
          name: Service.MOVIE,
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${brokerUsername}:${brokerPassword}@${brokerHost}:${brokerPort}`],
            queue: QUEUE.MOVIE,
            queueOptions: {
              durable: false,
            },
          }
        }
      }
    }])
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}