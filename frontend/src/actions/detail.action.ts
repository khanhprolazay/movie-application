import homeApis from "@/apis/homeApis";
import detailsConstants from "@/constants/detail.constants";
import { DetailMovie, ReduxAction } from "@/type";
import { TypedDispatch } from "@/redux/store";

function getDetailMovie(id: number) {

    return (dispatch: TypedDispatch) => {
        dispatch(request());
        // Fetch genres here
        homeApis.getDetailMovie(id)
            .then(data => {
                dispatch(success(data));

            })
            .catch(err => dispatch(error(err)))


        function request(): ReduxAction {
            return {
                type: detailsConstants.GET_DETAIL_MOVIE
            }
        }

        function success(details: DetailMovie): ReduxAction {

            return {
                type: detailsConstants.GET_DETAIL_MOVIE_SUCCESS,
                payload: { details },
            }
        }

        function error(error: string): ReduxAction {
            return {
                type: detailsConstants.GET_DETAIL_MOVIE_ERROR,
                payload: { error },

            }
        }
    }
}

const detailsActions = { getDetailMovie };
export default detailsActions;