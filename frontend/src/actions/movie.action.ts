import movieService from "@/services/movie.service";
import moviesConstants from "@/constants/movie.constants";
import { TypedDispatch } from "@/redux/store";
import { DetailMovie, Genre, Movie, ReduxAction } from "@/models";

const moviesActions = {
  getMovieByRating,
  getMovieByYear,
  getMovieByDay,
  getMovieByRandom,
  getMovieByRandomBackdrop,
  getMovieByGenres,
  getMovieByComing,
  getMovieByKeyword,
  getMovieDetail,
  getRelatedMovie,
  setKeyword,
  setYear,
  setGenres
};
export default moviesActions;

function getMovieByRating(skip: number, limit: number) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getMovieByRating(skip, limit)
      .then((data) => dispatch(success(data[0])))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_RATING,
      };
    }

    function success(movies: Movie[]): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_RATING_SUCCESS,
        payload: { movies },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_RATING_ERROR,
        payload: { error },
      };
    }
  };
}

function getMovieByDay(skip: number, limit: number) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getMovieByDay(skip, limit)
      .then((data) => dispatch(success(data[0])))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_DAY,
      };
    }

    function success(movies: Movie[]): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_DAY_SUCCESS,
        payload: { movies },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_DAY_ERROR,
        payload: { error },
      };
    }
  };
}

function getMovieByYear(year: number, skip: number, limit: number) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getMovieByYear(year, skip, limit)
      .then((data) => dispatch(success(data[0], data[1])))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_YEAR,
      };
    }

    function success(movies: Movie[], total: number): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_YEAR_SUCCESS,
        payload: { movies, total },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_YEAR_ERROR,
        payload: { error },
      };
    }
  };
}

function getMovieByRandom() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getMovieByRandom()
      .then((data) => dispatch(success(data)))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_RANDOM,
      };
    }

    function success(movies: Movie[]): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_RANDOM_SUCCESS,
        payload: { movies },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_RANDOM_ERROR,
        payload: { error },
      };
    }
  };
}

function getMovieByRandomBackdrop() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getMovieByRadomBackdrop()
      .then((data) => dispatch(success(data)))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_RANDOM_BACKDROP,
      };
    }

    function success(movies: Movie[]): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_RANDOM_BACKDROP_SUCCESS,
        payload: { movies },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_RANDOM_BACKDROP_ERROR,
        payload: { error },
      };
    }
  };
}

function getMovieByComing(skip: number, limit: number) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getMovieByComing(skip, limit)
      .then((data) => dispatch(success(data[0])))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_COMING,
      };
    }

    function success(movies: Movie[]): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_COMING_SUCCESS,
        payload: { movies },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_COMING_ERROR,
        payload: { error },
      };
    }
  };
}

function getMovieByGenres(genres: Array<Genre>, skip: number, limit: number) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getMovieByGenres(genres, skip, limit)
      .then((data) => dispatch(success(data[0], data[1])))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_GENRES,
      };
    }

    function success(movies: Movie[], total: number): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_GENRES_SUCCESS,
        payload: { movies, total },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_GENRES_ERROR,
        payload: { error },
      };
    }
  };
}

function getMovieByKeyword(keyword: string, skip: number, limit: number) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getMovieByKeyword(keyword, skip, limit)
      .then((data) => dispatch(success(data[0], data[1])))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_KEYWORD,
      };
    }

    function success(movies: Movie[], total: number): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_KEYWORD_SUCCESS,
        payload: { movies, total },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: moviesConstants.GET_MOVIE_BY_KEYWORD_ERROR,
        payload: { error },
      };
    }
  };
}

function getMovieDetail(id: number) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getDetailMovie(id)
      .then((data) => {
        dispatch(success(data));
        dispatch(getRelatedMovie(data.imdbId));
      })
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: moviesConstants.GET_DETAIL_MOVIE,
      };
    }

    function success(movie: DetailMovie): ReduxAction {
      return {
        type: moviesConstants.GET_DETAIL_MOVIE_SUCCESS,
        payload: { movie },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: moviesConstants.GET_DETAIL_MOVIE_ERROR,
        payload: { error },
      };
    }
  };
}

function getRelatedMovie(imdbId: string) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getMovieByRecommend(imdbId)
      .then((data) => dispatch(success(data)))
      .catch((err) => dispatch(error(err)));
  };

  function request(): ReduxAction {
    return {
      type: moviesConstants.GET_RELATED_MOVIE,
    };
  }

  function success(movies: Movie[]): ReduxAction {
    return {
      type: moviesConstants.GET_RELATED_MOVIE_SUCCESS,
      payload: { movies },
    };
  }

  function error(error: string): ReduxAction {
    return {
      type: moviesConstants.GET_RELATED_MOVIE_ERROR,
      payload: { error },
    };
  }
}

function setKeyword(keyword: string) {
  return (dispatch: TypedDispatch) => {
    dispatch(success(keyword));
  };

  function success(keyword: string): ReduxAction {
    return {
      type: moviesConstants.SET_KEYWORD_MOVIE,
      payload: { keyword },
    };
  }
}

function setYear(year: number) {
  return (dispatch: TypedDispatch) => {
    dispatch(success(year));
  };

  function success(year: number): ReduxAction {
    return {
      type: moviesConstants.SET_YEAR_MOVIE,
      payload: { year },
    };
  }
}

function setGenres(genres: string[]) {
  return (dispatch: TypedDispatch) => {
    dispatch(success(genres));
  };

  function success(genres: string[]): ReduxAction {
    return {
      type: moviesConstants.SET_GENRES_MOVIE,
      payload: { genres },
    };
  }
}
