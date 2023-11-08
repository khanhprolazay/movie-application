import homeApis from "@/apis/homeApis";
import genreConstants from "@/constants/genre.constant";
import { Genre, ReduxAction } from "@/type";
import { Dispatch } from "redux";

function getGenres() {
  return (dispatch: Dispatch) => {
    dispatch(request());
    // Fetch genres here
    homeApis.getGenres()
      .then(data => dispatch(success(data)))
      .catch(err => dispatch(error(err)))


    function request(): ReduxAction {
      return {
        type: genreConstants.GET_GENRES
      }
    }

    function success(genres: Genre[]): ReduxAction {
      return {
        type: genreConstants.GET_GENRES_SUCCESS,
        payload: { genres },
      }
    }

    function error(error: string): ReduxAction {
      return {
        type: genreConstants.GET_GENRES_ERROR,
        payload: { error },

      }
    }
  }
}

const genreActions = { getGenres };
export default genreActions;