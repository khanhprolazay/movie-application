import genreConstants from "@/constants/genre.constant";
import { ReduxAction } from "@/type";
import { Dispatch } from "redux";

function getGenres() {
  return (dispatch: Dispatch) => {
    dispatch(request());
    // Fetch genres here

    function request(): ReduxAction {
      return { 
        type: genreConstants.GET_GENRES
      }
    }

    // function success(genres: Genre[]): ReduxAction {
    //   return {
    //     type: genreConstants.GET_GENRES_SUCCESS,
    //     payload: { genres },
    //   }
    // }

    // function error(): ReduxAction {
    //   return {
    //     type: genreConstants.GET_GENRES_ERROR,
    //   }
    // }
  }
}

const genreActions = { getGenres };
export default genreActions;