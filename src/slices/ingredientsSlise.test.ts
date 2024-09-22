import { describe, expect, test } from '@jest/globals';
import ingredientReducer, {
  fetchIngredients,
  initialState
} from './ingredientsSlice';
import { configureStore } from '@reduxjs/toolkit';

beforeEach(() => {
  jest.clearAllMocks();
});

const expectedResult = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  }
];

describe('тест слайса ингридиентов', () => {
  test('инициализация редьюсера ', () => {
    expect(ingredientReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('тест получения данных ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, data: expectedResult })
        })
      ) as jest.Mock
    );

    const store = configureStore({
      reducer: { ingredients: ingredientReducer }
    });

    await store.dispatch(fetchIngredients());

    const { data } = store.getState().ingredients;

    expect(data).toEqual(expectedResult);
  });

  test('тест вызова экшена Request ', () => {
    const state = ingredientReducer(initialState, fetchIngredients.pending(''));
    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBe('');
  });

  test('тест вызова экшена Reject ', () => {
    const state = ingredientReducer(
      initialState,
      fetchIngredients.rejected(new Error('ошибка'), '')
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова экшена Success ', () => {
    const state = ingredientReducer(
      initialState,
      fetchIngredients.fulfilled(expectedResult, '')
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(expectedResult);
  });
});
