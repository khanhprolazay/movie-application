import { Controller } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { MessagePattern } from "@nestjs/microservices";
import { PatternOption } from "@app/shared";

@Controller()
export class GenreController {
  constructor ( private readonly genreService: GenreService ) {}

  @MessagePattern(PatternOption["GENRE.GET.ALL"])
  async getAll() {
    return await this.genreService.getAll();
  }
}