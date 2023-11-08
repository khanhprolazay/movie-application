import detailsConstants from "@/constants/detail.constants";
import { ReduxAction, DetailMovie } from "@/type";

export interface DetailsRootState {
  loading: boolean,
  data: DetailMovie | null,
  error: string | null
}

const initialState: DetailsRootState = {
  loading: false,
  data: null,
  error: null
}

export function DetailMovie(state: DetailsRootState = initialState, action: ReduxAction): DetailsRootState {
  switch (action.type) {
    case detailsConstants.GET_DETAIL_MOVIE:
      return {
        ...state,
        loading: true
      }

    case detailsConstants.GET_DETAIL_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload?.details
      }

    case detailsConstants.GET_DETAIL_MOVIE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload?.error,
      }

    default: 
      return state;
  }
}