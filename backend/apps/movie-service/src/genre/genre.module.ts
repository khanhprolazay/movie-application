import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genre, Service } from "@app/shared";
import { GenreController } from "./genre.controller";
import { GenreService } from "./genre.service";
import { GenreRepository } from "./genre.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Genre], Service.MOVIE)],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository],
  exports: [GenreService],
})
export class GenreModule {}