import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie, QUEUE, Service } from "@app/shared";
import { MovieRepository } from "./movie.repository";
import { GenreModule } from "../genre/genre.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([Movie], Service.MOVIE), GenreModule,
  ClientsModule.registerAsync([{
    name: Service.RECOMMENDATION,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const brokerHost = configService.get("BROKER_HOST");
      const brokerPort = configService.get("BROKER_PORT");
      const brokerVhost = configService.get("BROKER_VHOST");
      const brokerUsername = configService.get("BROKER_USERNAME");
      const brokerPassword = configService.get("BROKER_PASSWORD");

      return {
        name: Service.RECOMMENDATION,
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${brokerUsername}:${brokerPassword}@${brokerHost}:${brokerPort}/${brokerVhost}`],
          queue: QUEUE.RECOMMENDATION,
          queueOptions: {
            durable: false,
          },
        }
      }
    }
  }])
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
})
export class MovieModule{};