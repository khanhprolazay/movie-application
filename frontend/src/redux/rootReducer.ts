import { authentication, genre, user, alert, sidebar, MovieByRating, MovieByDay, MovieByRecommend, MovieByYear, MovieByRandom, DetailMovie, MovieByGenres } from "@/reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user, genre, authentication, alert, sidebar, MovieByRating, MovieByDay, MovieByRecommend, MovieByYear, MovieByRandom, DetailMovie, MovieByGenres
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;