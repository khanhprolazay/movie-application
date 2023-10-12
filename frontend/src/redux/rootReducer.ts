import { authentication, genre, user, alert } from "@/reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user, genre, authentication, alert
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;