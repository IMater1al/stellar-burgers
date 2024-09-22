import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: constructorReducer,
  order: orderReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

// export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
