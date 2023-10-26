import { ArrayMinSize, IsArray, IsNumber, IsString } from "class-validator";

abstract class Pagination {
  @IsNumber()
  limit: number
  
  @IsNumber()
  skip: number
}

export class MovieByYearDTO extends Pagination {
  @IsNumber()
  year: number
}

export class MovieByGenresDTO extends Pagination {
  @IsArray()
  @IsString({each: true})
  @ArrayMinSize(1)
  genres: string[]
}

export class MovieByRatingDTO extends Pagination {}
