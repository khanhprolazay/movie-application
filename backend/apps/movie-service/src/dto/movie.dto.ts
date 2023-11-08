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

export class MovieBySeachDTO extends Pagination {
  @IsString()
  search: string
}

export class MovieByDayDTO extends Pagination {}
export class MovieByRatingDTO extends Pagination {}
export class MovieByUpcomingDTO extends Pagination {}
