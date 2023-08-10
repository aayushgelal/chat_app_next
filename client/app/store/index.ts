import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AuthSlice } from "../reducers/authreducer";
import { UserSlice } from "../reducers/usersreducer";
import { CurrentUser } from "../reducers/currentusereducer";
import { imagereducer } from "../reducers/imagereducer";
import { composeWithDevTools } from 'redux-devtools-extension';

// ...

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    users: UserSlice.reducer,
    current_user: CurrentUser.reducer,
    selected_image: imagereducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
