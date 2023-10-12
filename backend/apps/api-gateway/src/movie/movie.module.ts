import { v4 } from "uuid";
import { Service } from "@app/shared";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";

@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: Service.MOVIE,
      useFactory: (configService: ConfigService) => (
        {
          transport: Transport.KAFKA,
          options: {
            client: { 
              brokers: [configService.get<string>('BROKER_HOST')],
            },
            consumer: {
              groupId: `movie-from-api-gateway-${v4()}`,
            }
          }
        }), inject: [ConfigService]
    }])
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}