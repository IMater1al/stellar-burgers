import { describe, expect, test } from '@jest/globals';
import constructorReducer, {
  addIngredient,
  deleteIngredient,
  moveDown,
  moveUp,
  initialState
} from './constructorSlice';

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

describe('тест слайса конструктора бургеров', () => {
  test('инициализация редьюсера ', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('тест обработка экшена добавления ингредиента', () => {
    const ingredientWithoutId = { ...ingredientOne, id: '' };

    const newState = constructorReducer(
      initialState,
      addIngredient(ingredientWithoutId)
    );

    expect(newState).toEqual({
      ...initialState,
      ingredients: [{ ...ingredientWithoutId, id: expect.any(String) }]
    });

    expect(newState.ingredients[0].id).not.toBe('');
  });

  test('тест обработка экшена удаления ингредиента', () => {
    const stateWithIng = {
      bun: null,
      ingredients: [ingredientOne]
    };

    const newState = constructorReducer(stateWithIng, deleteIngredient('1234'));

    expect(newState).toEqual({ bun: null, ingredients: [] });
  });

  test('тест обработка экшена перемещения ингредиента вверх', () => {
    const stateWithTwoIng = {
      bun: null,
      ingredients: [ingredientOne, ingredientTwo]
    };

    const newState = constructorReducer(stateWithTwoIng, moveUp('1235'));

    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTwo, ingredientOne]
    });
  });

  test('тест обработка экшена перемещения ингредиента вниз', () => {
    const stateWithTwoIng = {
      bun: null,
      ingredients: [ingredientOne, ingredientTwo]
    };

    const newState = constructorReducer(stateWithTwoIng, moveDown('1234'));

    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTwo, ingredientOne]
    });
  });
});
