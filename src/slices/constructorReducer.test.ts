import { describe, expect, test } from '@jest/globals';
import constructorReducer, {
  addIngredient,
  deleteIngredient,
  moveDown,
  moveUp
} from './constructorSlice';
import { TIngredient } from '@utils-types';

describe('тест слайса конструктора бургеров', () => {
  test('инициализация редьюсера ', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('тест обработка экшена добавления ингредиента', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const ingredient: TIngredient = {
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
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    const newState = constructorReducer(
      initialState,
      addIngredient(ingredient)
    );

    expect(newState).toEqual({
      ...initialState,
      ingredients: [{ ...ingredient, id: expect.any(String) }]
    });
  });

  test('тест обработка экшена удаления ингредиента', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          id: '1234',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ]
    };

    const newState = constructorReducer(initialState, deleteIngredient('1234'));

    expect(newState).toEqual({ bun: null, ingredients: [] });
  });

  test('тест обработка экшена перемещения ингредиента вверх', () => {
    const ingredientOne = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      id: '1234',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    const ingredientTwo = {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      id: '1235',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    };

    const initialState = {
      bun: null,
      ingredients: [ingredientOne, ingredientTwo]
    };

    const newState = constructorReducer(initialState, moveUp('1235'));

    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTwo, ingredientOne]
    });
  });

  test('тест обработка экшена перемещения ингредиента вниз', () => {
    const ingredientOne = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      id: '1234',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    const ingredientTwo = {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      id: '1235',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    };

    const initialState = {
      bun: null,
      ingredients: [ingredientOne, ingredientTwo]
    };

    const newState = constructorReducer(initialState, moveDown('1234'));

    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTwo, ingredientOne]
    });
  });
});
