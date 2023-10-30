import genreConstants from "@/constants/genre.constant";
import { ReduxAction, Genre } from "@/type";

export interface GenreRootState {
  loading: boolean,
  data: Genre[],
  error: string | null
}

const initialState: GenreRootState = {
  loading: false,
  data: [],
  error: null
}

export function genre(state: GenreRootState = initialState, action: ReduxAction): GenreRootState {
  switch (action.type) {
    case genreConstants.GET_GENRES:
      return {
        ...state,
        loading: true
      }

    case genreConstants.GET_GENRES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload?.genres
      }

    case genreConstants.GET_GENRES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload?.error,
      }

    default: 
      return state;
  }
}