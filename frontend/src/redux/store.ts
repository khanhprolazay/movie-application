import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState as RootReducerState } from './rootReducer';
import { Store, createStore, applyMiddleware, AnyAction } from "redux";

const store: Store<RootReducerState> = createStore(rootReducer, applyMiddleware(thunk))


export default store;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

/* Types */
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
