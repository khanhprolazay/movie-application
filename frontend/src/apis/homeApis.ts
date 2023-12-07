import { Genre, Movie, DetailMovie } from "@/type";
import { axiosClient } from "./axiosClient";

class HomeApis {

    async getGenres(): Promise<Genre[]> {
        return await axiosClient.get("/movies/genres")
    }

    async getMovieByRating(skip: number, limit: number): Promise<[Movie[], number]> {
        return await axiosClient.get(`/movies/byRating?skip=${skip}&limit=${limit}`)
    }

    async getMovieByDay(skip: number, limit: number): Promise<[Movie[], number]> {
        return await axiosClient.get(`/movies/byDay?skip=${skip}&limit=${limit}`)
    }

    async getMovieByRecommend(genres: Array<Genre>, skip: number, limit: number): Promise<[Movie[], number]> {
        const genreQuery = genres.reduce((acc, genre, index) => index > 0 ? `${acc},${genre.name}` : genre.name, '');
        return await axiosClient.get(`/movies/byRecommend?genres=${genreQuery}&skip=${skip}&limit=${limit}`);
    }

    async getMovieByYear(year: number, skip: number, limit: number): Promise<[Movie[], number]> {
        return await axiosClient.get(`/movies/byYear?year=${year}&skip=${skip}&limit=${limit}`)
    }

    async getMovieByRandom(skip: number, limit: number): Promise<[Movie[], number]> {
        return await axiosClient.get(`/movies/byRandom?skip=${skip}&limit=${limit}`)
    }

    async getDetailMovie(id: number): Promise<DetailMovie> {
        return await axiosClient.get(`/movies/byId/${id}`);
    }

    async getMovieByGenres(genres: Array<Genre>, skip: number, limit: number): Promise<[Movie[], number]> {
        // console.log(genres)
        const genreQuery = genres.reduce((acc, genre, index) => index > 0 ? `${acc},${genre.name}` : genre.name, '');
        return await axiosClient.get(`/movies/byGenres?genres=${genreQuery}&skip=${skip}&limit=${limit}`);
    }

    async getMovieByKeyword(keyword: string, skip: number, limit: number): Promise<[Movie[], number]> {
        // console.log("keyword", keyword)
        return await axiosClient.get(`/movies/bySearch?search=${keyword}&skip=${skip}&limit=${limit}`)
    }

    async getMovieByComing(skip: number, limit: number): Promise<[Movie[], number]> {
        return await axiosClient.get(`/movies/byUpcoming?skip=${skip}&limit=${limit}`)
    }


}

const homeApis = new HomeApis();
export default homeApis;




