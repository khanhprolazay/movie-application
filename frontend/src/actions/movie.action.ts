import homeApis from "@/apis/homeApis";
import moviesConstants from "@/constants/movie.constants";
import { TypedDispatch } from "@/redux/store";
import { DetailMovie, Genre, Movie, ReduxAction } from "@/type";

function getMovieByRating(skip: number, limit: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        homeApis.getMovieByRating(skip, limit)
            .then(data => dispatch(success(data[0])))
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
        homeApis.getMovieByDay(skip, limit)
            .then(data => dispatch(success(data[0])))
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
        homeApis.getMovieByRecommend(skip, limit)
            .then(data => dispatch(success(data[0])))
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
        homeApis.getMovieByYear(year, skip, limit)
            .then(data => dispatch(success(data[0])))
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
        homeApis.getMovieByRandom(skip, limit)
            .then(data => dispatch(success(data[0])))
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


function getMovieByComing(skip: number, limit: number) {
    return (dispatch: TypedDispatch) => {
        dispatch(request());
        homeApis.getMovieByComing(skip, limit)
            .then(data => dispatch(success(data[0])))
            .catch(err => dispatch(error(err)))


        function request(): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_COMING
            }
        }

        function success(movies: Movie[]): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_COMING_SUCCESS,
                payload: { movies },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_COMING_ERROR,
                payload: { error },
            }
        }
    }
}


function getMovieByGenres(genres: Array<Genre>, skip: number, limit: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        homeApis.getMovieByGenres(genres, skip, limit)
            .then(data => dispatch(success(data[0])))
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


function getMovieByKeyword(keyword: string, skip: number, limit: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        homeApis.getMovieByKeyword(keyword, skip, limit)
            .then(data => dispatch(success(data[0])))
            .catch(err => dispatch(error(err)))


        function request(): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_KEYWORD
            }
        }

        function success(movies: Movie[]): ReduxAction {

            return {
                type: moviesConstants.GET_MOVIE_BY_KEYWORD_SUCCESS,
                payload: { movies },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: moviesConstants.GET_MOVIE_BY_KEYWORD_ERROR,
                payload: { error },

            }
        }
    }
}

function getMovieDetail(id: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        homeApis.getDetailMovie(id)
            .then(data => {
                dispatch(success(data));
                dispatch(getRelatedMovie(data.genres.map(genre => genre.genre)));
            })
            .catch(err => dispatch(error(err)))

        function request(): ReduxAction {
            return {
                type: moviesConstants.GET_DETAIL_MOVIE
            }
        }

        function success(movie: DetailMovie): ReduxAction {

            return {
                type: moviesConstants.GET_DETAIL_MOVIE_SUCCESS,
                payload: { movie },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: moviesConstants.GET_DETAIL_MOVIE_ERROR,
                payload: { error },

            }
        }
    }
}

function getRelatedMovie(genres: Genre[]) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        homeApis.getMovieByGenres(genres, 0, 10)
            .then(data => dispatch(success(data[0])))
            .catch(err => dispatch(error(err)))
    }

    function request(): ReduxAction {
        return {
            type: moviesConstants.GET_RELATED_MOVIE
        }
    }

    function success(movies: Movie[]): ReduxAction {
        return {
            type: moviesConstants.GET_RELATED_MOVIE_SUCCESS,
            payload: { movies },
        }
    }

    function error(error: string): ReduxAction {
        return {
            type: moviesConstants.GET_RELATED_MOVIE_ERROR,
            payload: { error },

        }
    }
}

const moviesActions = { getMovieByRating, getMovieByYear, getMovieByDay, getMovieByRandom, getMovieByGenres, getMovieByComing, getMovieByKeyword, getMovieDetail, getRelatedMovie };
export default moviesActions;