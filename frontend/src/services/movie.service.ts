import { Genre, Movie, DetailMovie } from "@/type";
import { axiosClient } from "./axios-client";

class MovieService {
  getGenres(): Promise<Genre[]> {
    return axiosClient.get("/movies/genres");
  }

  getMovieByRating(skip: number, limit: number): Promise<[Movie[], number]> {
    return axiosClient.get(`/movies/byRating?skip=${skip}&limit=${limit}`);
  }

  getMovieByDay(skip: number, limit: number): Promise<[Movie[], number]> {
    return axiosClient.get(`/movies/byDay?skip=${skip}&limit=${limit}`);
  }

  getMovieByRecommend(imdbId: string): Promise<Movie[]> {
    return axiosClient.get(`/movies/byRecommend?imdbId=${imdbId}`);
  }

  getMovieByYear(
    year: number,
    skip: number,
    limit: number,
  ): Promise<[Movie[], number]> {
    return axiosClient.get(
      `/movies/byYear?year=${year}&skip=${skip}&limit=${limit}`,
    );
  }

  getMovieByRandom(): Promise<Movie[]> {
    return axiosClient.get(`/movies/byRandom`);
  }

  getMovieByRadomBackdrop(): Promise<Movie[]> {
    return axiosClient.get(`/movies/byRandomBackdrop`);
  }

  getDetailMovie(id: number): Promise<DetailMovie> {
    return axiosClient.get(`/movies/byId/${id}`);
  }

  getMovieByGenres(
    genres: Array<Genre>,
    skip: number,
    limit: number,
  ): Promise<[Movie[], number]> {
    const genreQuery = genres.reduce(
      (acc, genre, index) => (index > 0 ? `${acc},${genre.name}` : genre.name),
      "",
    );
    return axiosClient.get(
      `/movies/byGenres?genres=${genreQuery}&skip=${skip}&limit=${limit}`,
    );
  }

  getMovieByKeyword(
    keyword: string,
    skip: number,
    limit: number,
  ): Promise<[Movie[], number]> {
    return axiosClient.get(
      `/movies/bySearch?search=${keyword}&skip=${skip}&limit=${limit}`,
    );
  }

  getMovieByComing(skip: number, limit: number): Promise<[Movie[], number]> {
    return axiosClient.get(`/movies/byUpcoming?skip=${skip}&limit=${limit}`);
  }
}

const movieService = new MovieService();
export default movieService;
