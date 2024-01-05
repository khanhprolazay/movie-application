import movieConstants from "@/constants/movie.constants";
import { ReduxAction, Movie, Genre, DetailMovie } from "@/models";

export interface MovieRootState {
  rating: {
    loading: boolean;
    skip: number;
    limit: number;
    data: Movie[];
    error: string | null;
  };
  day: {
    loading: boolean;
    skip: number;
    limit: number;
    data: Movie[];
    error: string | null;
  };
  recommend: {
    loading: boolean;
    skip: number;
    limit: number;
    data: Movie[];
    error: string | null;
  };
  random: {
    loading: boolean;
    data: Movie[];
    error: string | null;
  };
  randomBackdrop: {
    loading: boolean;
    data: Movie[];
    error: string | null;
  };
  coming: {
    loading: boolean;
    skip: number;
    limit: number;
    data: Movie[];
    error: string | null;
  };

  search: {
    loading: boolean;
    year: number;
    genres: Genre[];
    keyword: string;
    data: Movie[];
    total: number;
    error: string | null;
  };

  current: {
    loading: boolean;
    data: DetailMovie | null;
    error: string | null;
    related: Movie[];
    relatedLoading: boolean;
  };
}

const initialState: MovieRootState = {
  rating: {
    loading: false,
    skip: 0,
    limit: 20,
    data: [],
    error: null,
  },
  day: {
    loading: false,
    skip: 0,
    limit: 20,
    data: [],
    error: null,
  },
  recommend: {
    loading: false,
    skip: 0,
    limit: 20,
    data: [],
    error: null,
  },
  random: {
    loading: false,
    data: [],
    error: null,
  },
  randomBackdrop: {
    loading: false,
    data: [],
    error: null,
  },
  coming: {
    loading: false,
    skip: 0,
    limit: 20,
    data: [],
    error: null,
  },
  search: {
    loading: false,
    year: 0,
    genres: [],
    keyword: "",
    data: [],
    total: 0,
    error: null,
  },
  current: {
    loading: false,
    relatedLoading: false,
    data: null,
    error: null,
    related: [],
  },
};

export function movie(
  state: MovieRootState = initialState,
  action: ReduxAction,
): MovieRootState {
  switch (action.type) {
    case movieConstants.GET_MOVIE_BY_RATING:
      return {
        ...state,
        rating: {
          ...state.rating,
          loading: true,
        },
      };

    case movieConstants.GET_MOVIE_BY_RATING_SUCCESS:
      return {
        ...state,
        rating: {
          ...state.rating,
          loading: false,
          data: action.payload?.movies,
        },
      };

    case movieConstants.GET_MOVIE_BY_RATING_ERROR:
      return {
        ...state,
        rating: {
          ...state.rating,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_MOVIE_BY_DAY:
      return {
        ...state,
        day: {
          ...state.day,
          loading: true,
        },
      };

    case movieConstants.GET_MOVIE_BY_DAY_SUCCESS:
      return {
        ...state,
        day: {
          ...state.day,
          loading: false,
          data: action.payload?.movies,
        },
      };

    case movieConstants.GET_MOVIE_BY_DAY_ERROR:
      return {
        ...state,
        day: {
          ...state.day,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_MOVIE_BY_RECOMMEND:
      return {
        ...state,
        recommend: {
          ...state.recommend,
          loading: true,
        },
      };

    case movieConstants.GET_MOVIE_BY_RECOMMEND_SUCCESS:
      return {
        ...state,
        recommend: {
          ...state.recommend,
          loading: false,
          data: action.payload?.movies,
        },
      };

    case movieConstants.GET_MOVIE_BY_RECOMMEND_ERROR:
      return {
        ...state,
        recommend: {
          ...state.recommend,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_MOVIE_BY_YEAR:
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
        },
      };

    case movieConstants.GET_MOVIE_BY_YEAR_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          data: action.payload?.movies,
          total: action.payload?.total,
        },
      };

    case movieConstants.GET_MOVIE_BY_YEAR_ERROR:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_MOVIE_BY_RANDOM:
      return {
        ...state,
        random: {
          ...state.random,
          loading: true,
        },
      };

    case movieConstants.GET_MOVIE_BY_RANDOM_SUCCESS:
      return {
        ...state,
        random: {
          ...state.random,
          loading: false,
          data: action.payload?.movies,
        },
      };

    case movieConstants.GET_MOVIE_BY_RANDOM_ERROR:
      return {
        ...state,
        random: {
          ...state.random,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_MOVIE_BY_RANDOM_BACKDROP:
      return {
        ...state,
        randomBackdrop: {
          ...state.randomBackdrop,
          loading: true,
        },
      };

    case movieConstants.GET_MOVIE_BY_RANDOM_BACKDROP_SUCCESS:
      return {
        ...state,
        randomBackdrop: {
          ...state.randomBackdrop,
          loading: false,
          data: action.payload?.movies,
        },
      };

    case movieConstants.GET_MOVIE_BY_RANDOM_BACKDROP_ERROR:
      return {
        ...state,
        randomBackdrop: {
          ...state.random,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_MOVIE_BY_COMING:
      return {
        ...state,
        coming: {
          ...state.coming,
          loading: true,
        },
      };

    case movieConstants.GET_MOVIE_BY_COMING_SUCCESS:
      return {
        ...state,
        coming: {
          ...state.coming,
          loading: false,
          data: action.payload?.movies,
        },
      };

    case movieConstants.GET_MOVIE_BY_COMING_ERROR:
      return {
        ...state,
        coming: {
          ...state.coming,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_MOVIE_BY_GENRES:
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
        },
      };

    case movieConstants.GET_MOVIE_BY_GENRES_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          data: action.payload?.movies,
          total: action.payload?.total,
        },
      };

    case movieConstants.GET_MOVIE_BY_GENRES_ERROR:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_MOVIE_BY_KEYWORD:
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
        },
      };

    case movieConstants.GET_MOVIE_BY_KEYWORD_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          data: action.payload?.movies,
          total: action.payload?.total,
        },
      };

    case movieConstants.GET_MOVIE_BY_KEYWORD_ERROR:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_DETAIL_MOVIE:
      return {
        ...state,
        current: {
          ...state.current,
          loading: true,
        },
      };

    case movieConstants.GET_DETAIL_MOVIE_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          loading: false,
          data: action.payload?.movie,
        },
      };

    case movieConstants.GET_DETAIL_MOVIE_ERROR:
      return {
        ...state,
        current: {
          ...state.current,
          loading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.GET_RELATED_MOVIE:
      return {
        ...state,
        current: {
          ...state.current,
          related: [],
          relatedLoading: true,
        },
      };

    case movieConstants.GET_RELATED_MOVIE_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          relatedLoading: false,
          related: action.payload?.movies,
        },
      };

    case movieConstants.GET_RELATED_MOVIE_ERROR:
      return {
        ...state,
        current: {
          ...state.current,
          relatedLoading: false,
          error: action.payload?.error,
        },
      };

    case movieConstants.SET_KEYWORD_MOVIE:
      return {
        ...state,
        search: {
          ...state.search,
          year: 0,
          genres: [],
          keyword: action.payload?.keyword,
        },
      };

    case movieConstants.SET_GENRES_MOVIE:
      return {
        ...state,
        search: {
          ...state.search,
          year: 0,
          keyword: "",
          genres: action.payload?.genres,
        },
      };

    case movieConstants.SET_YEAR_MOVIE:
      return {
        ...state,
        search: {
          ...state.search,
          keyword: "",
          genres: [],
          year: action.payload?.year,
        },
      };

    default:
      return state;
  }
}
