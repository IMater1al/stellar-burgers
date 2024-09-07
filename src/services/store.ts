import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import ingredientsReducer from '../slices/ingredientsSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
