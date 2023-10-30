import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "@app/shared";
import { MovieRepository } from "./movie.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
})
export class MovieModule{};