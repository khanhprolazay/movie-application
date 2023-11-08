import { authentication, genre, user, alert, sidebar, DetailMovie, movie } from "@/reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user, genre, authentication, alert, sidebar, DetailMovie, movie
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;