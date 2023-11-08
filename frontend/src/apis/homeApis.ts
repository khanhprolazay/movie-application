import { Genre, Movie, DetailMovie } from "@/type";
import { axiosClient } from "./axiosClient";

class HomeApis {

    async getGenres(): Promise<Genre[]> {
        return await axiosClient.get("/movies/genres")
    }

    async getMovieByRating(skip: number, limit: number): Promise<Movie[]> {
        return await axiosClient.get(`/movies/byRating?skip=${skip}&limit=${limit}`)
    }

    async getMovieByDay(skip: number, limit: number): Promise<Movie[]> {
        return await axiosClient.get(`/movies/byDay?skip=${skip}&limit=${limit}`)
    }

    async getMovieByRecommend(skip: number, limit: number): Promise<Movie[]> {
        return await axiosClient.get(`/movies/byRecommend?skip=${skip}&limit=${limit}`)
    }

    async getMovieByYear(year: number, skip: number, limit: number): Promise<Movie[]> {
        return await axiosClient.get(`/movies/byYear?year=${year}&skip=${skip}&limit=${limit}`)
    }

    async getMovieByRandom(skip: number, limit: number): Promise<Movie[]> {
        return await axiosClient.get(`/movies/byRandom?skip=${skip}&limit=${limit}`)
    }

    async getDetailMovie(id: number): Promise<DetailMovie> {
        return await axiosClient.get(`/movies/byId/${id}`);
    }

    async getMovieByGenres(genres: Array<Genre>, skip: number, limit: number): Promise<Movie[]> {
        const genreQuery = genres.map((genre) => `genres=${encodeURIComponent(genre.name)}`).join('&');
        // console.log(genreQuery)
        return await axiosClient.get(`/movies/byGenres?${genreQuery}&skip=${skip}&limit=${limit}`);
    }



}

const homeApis = new HomeApis();
export default homeApis;




