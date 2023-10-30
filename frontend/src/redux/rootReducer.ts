import { authentication, genre, user, alert, sidebar } from "@/reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user, genre, authentication, alert, sidebar
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;