import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/product';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// ...

const store = configureStore({
  reducer: {
    products: productReducer,
   },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector