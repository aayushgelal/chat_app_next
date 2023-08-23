import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { AuthSlice } from "../reducers/authreducer";
import { UserSlice } from "../reducers/usersreducer";
import { CurrentUser } from "../reducers/currentusereducer";
import { imagereducer } from "../reducers/imagereducer";
import { socketreducer } from "../reducers/socketreducer";
import WebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { signalreducer } from "../reducers/signalreducer";

// ...

const persistConfig = {
  key: "root",
  storage: WebStorage("local"),
};
const persistedReducer = persistReducer(persistConfig, AuthSlice.reducer);

const combinedreducers = combineReducers({
  auth: persistedReducer,
  users: UserSlice.reducer,
  current_user: CurrentUser.reducer,
  selected_image: imagereducer.reducer,
  socket: socketreducer.reducer,
  signal: signalreducer.reducer,
});
export const store = configureStore({
  reducer: combinedreducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
