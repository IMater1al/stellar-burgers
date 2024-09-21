import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/store';
import { initialState as ingredientIS } from './ingredientsSlice';
import { initialState as constructorIS } from './constructorSlice';
import { initialState as orderIS } from './orderSlice';
import { initialState as userIS } from './userSlice';

describe('тесты редьюсера', () => {
  test('инициализация редьюсера ', () => {
    const store = configureStore({ reducer: rootReducer });

    expect(store.getState().ingredients).toEqual(ingredientIS);
    expect(store.getState().burger).toEqual(constructorIS);
    expect(store.getState().order).toEqual(orderIS);
    expect(store.getState().user).toEqual(userIS);
  });
});
