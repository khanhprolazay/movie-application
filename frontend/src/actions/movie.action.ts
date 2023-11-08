import homeApis from "@/apis/homeApis";
import moviesConstants from "@/constants/movie.constants";
import { TypedDispatch } from "@/redux/store";
import { Genre, Movie, ReduxAction } from "@/type";

function getMovieByRating(skip: number, limit: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        // Fetch genres here
        homeApis.getMovieByRating(skip, limit)
            .then(data => dispatch(success(data)))
            .catch(err => dispatch(error(err)))


        function request(): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_RATING
            }
        }

        function success(movies: Movie[]): ReduxAction {

            return {
                type: moviesConstants.GET_MOVIE_BY_RATING_SUCCESS,
                payload: { movies },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_RATING_ERROR,
                payload: { error },

            }
        }
    }
}


function getMovieByDay(skip: number, limit: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        // Fetch genres here
        homeApis.getMovieByDay(skip, limit)
            .then(data => dispatch(success(data)))
            .catch(err => dispatch(error(err)))


        function request(): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_DAY
            }
        }

        function success(movies: Movie[]): ReduxAction {

            return {
                type: moviesConstants.GET_MOVIE_BY_DAY_SUCCESS,
                payload: { movies },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_DAY_ERROR,
                payload: { error },
            }
        }
    }
}

function getMovieByRecommend(skip: number, limit: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        // Fetch genres here
        homeApis.getMovieByRecommend(skip, limit)
            .then(data => dispatch(success(data)))
            .catch(err => dispatch(error(err)))


        function request(): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_RECOMMEND
            }
        }

        function success(movies: Movie[]): ReduxAction {

            return {
                type: moviesConstants.GET_MOVIE_BY_RECOMMEND_SUCCESS,
                payload: { movies },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_RECOMMEND_ERROR,
                payload: { error },
            }
        }
    }
}


function getMovieByYear(year: number, skip: number, limit: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        // Fetch genres here
        homeApis.getMovieByYear(year, skip, limit)
            .then(data => dispatch(success(data)))
            .catch(err => dispatch(error(err)))


        function request(): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_YEAR
            }
        }

        function success(movies: Movie[]): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_YEAR_SUCCESS,
                payload: { movies },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_YEAR_ERROR,
                payload: { error },
            }
        }
    }
}


function getMovieByRandom(skip: number, limit: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        // Fetch genres here
        homeApis.getMovieByRandom(skip, limit)
            .then(data => dispatch(success(data)))
            .catch(err => dispatch(error(err)))


        function request(): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_RANDOM
            }
        }

        function success(movies: Movie[]): ReduxAction {

            return {
                type: moviesConstants.GET_MOVIE_BY_RANDOM_SUCCESS,
                payload: { movies },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_RANDOM_ERROR,
                payload: { error },
            }
        }
    }
}


function getMovieByGenres(genres: Array<Genre>, skip: number, limit: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        // Fetch genres here
        homeApis.getMovieByGenres(genres, skip, limit)
            .then(data => dispatch(success(data)))
            .catch(err => dispatch(error(err)))


        function request(): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_GENRES
            }
        }

        function success(movies: Movie[]): ReduxAction {

            return {
                type: moviesConstants.GET_MOVIE_BY_GENRES_SUCCESS,
                payload: { movies },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_GENRES_ERROR,
                payload: { error },
            }
        }
    }
}



const moviesActions = { getMovieByRating, getMovieByYear, getMovieByDay, getMovieByRandom, getMovieByGenres };
export default moviesActions;