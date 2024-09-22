import { describe, expect, test } from '@jest/globals';
import orderSliceReducer, {
  fetchFeeds,
  fetchGetOrderByNumberApi,
  fetchGetUserOrders,
  fetchOrderBurger,
  initialState
} from './orderSlice';
import { configureStore } from '@reduxjs/toolkit';

beforeEach(() => {
  jest.clearAllMocks();
});

const feedOne = {
  _id: '66ee7779119d45001b508126',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0947',
    '643d69a5c3f7b9001cfa0940',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Флюоресцентный фалленианский метеоритный бургер',
  createdAt: '2024-09-21T07:36:25.256Z',
  updatedAt: '2024-09-21T07:36:25.970Z',
  number: 53504
};

const feedTwo = {
  _id: '66ee775c119d45001b508125',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0942',
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa0948',
    '643d69a5c3f7b9001cfa094a',
    '643d69a5c3f7b9001cfa0949',
    '643d69a5c3f7b9001cfa0947',
    '643d69a5c3f7b9001cfa093c'
  ],
  status: 'done',
  name: 'Астероидный фалленианский краторный альфа-сахаридный экзо-плантаго традиционный-галактический spicy бургер',
  createdAt: '2024-09-21T07:35:56.787Z',
  updatedAt: '2024-09-21T07:35:57.426Z',
  number: 53503
};

const expectedFeedFetchResult = [feedOne, feedTwo];

const expectedOrderBurgerResult = feedTwo;
const expectedOrderByApiResult = [expectedOrderBurgerResult];

describe('тест слайса заказа', () => {
  test('инициализация редьюсера ', () => {
    expect(orderSliceReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('тест получения заказов ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              orders: expectedFeedFetchResult,
              total: 10,
              totalToday: 15
            })
        })
      ) as jest.Mock
    );

    const store = configureStore({
      reducer: { order: orderSliceReducer }
    });

    await store.dispatch(fetchFeeds());

    const { orders } = store.getState().order;

    expect(orders).toEqual(expectedFeedFetchResult);
  });

  test('тест вызова fetchFeeds Request ', () => {
    const state = orderSliceReducer(initialState, fetchFeeds.pending(''));
    expect(state.orderRequest).toBeTruthy();
    expect(state.error).toBe('');
  });

  test('тест вызова fetchFeeds Reject ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchFeeds.rejected(new Error('ошибка'), '')
    );
    expect(state.orderRequest).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова fetchFeeds Success ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchFeeds.fulfilled(
        {
          success: true,
          orders: expectedFeedFetchResult,
          total: 10,
          totalToday: 15
        },
        ''
      )
    );
    expect(state.orderRequest).toBeFalsy();
    expect(state.orders).toEqual(expectedFeedFetchResult);
  });

  test('тест вызова fetchGetUserOrders Request ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchGetUserOrders.pending('')
    );
    expect(state.orderRequest).toBeTruthy();
    expect(state.error).toBe('');
  });

  test('тест вызова fetchGetUserOrders Reject ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchGetUserOrders.rejected(new Error('ошибка'), '')
    );
    expect(state.orderRequest).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова fetchGetUserOrders Success ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchGetUserOrders.fulfilled(expectedFeedFetchResult, '')
    );
    expect(state.orderRequest).toBeFalsy();
    expect(state.userOrders).toEqual(expectedFeedFetchResult);
  });

  test('тест вызова fetchGetOrderByNumberApi Request ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchGetOrderByNumberApi.pending('', '')
    );
    expect(state.orderRequest).toBeTruthy();
    expect(state.error).toBe('');
  });

  test('тест вызова fetchGetOrderByNumberApi Reject ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchGetOrderByNumberApi.rejected(new Error('ошибка'), '', '')
    );
    expect(state.orderRequest).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова fetchGetOrderByNumberApi Success ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchGetOrderByNumberApi.fulfilled(
        { success: true, orders: expectedOrderByApiResult },
        '',
        ''
      )
    );
    expect(state.orderRequest).toBeFalsy();
    expect(state.orderModalData).toEqual(expectedOrderByApiResult[0]);
  });

  test('тест вызова fetchOrderBurger Request ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchOrderBurger.pending('', [])
    );
    expect(state.orderRequest).toBeTruthy();
    expect(state.error).toBe('');
  });

  test('тест вызова fetchOrderBurger Reject ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchOrderBurger.rejected(new Error('ошибка'), '', [])
    );
    expect(state.orderRequest).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова fetchOrderBurger Success ', () => {
    const state = orderSliceReducer(
      initialState,
      fetchOrderBurger.fulfilled(
        {
          success: true,
          order: expectedOrderBurgerResult,
          name: '123'
        },
        '',
        []
      )
    );
    expect(state.orderRequest).toBeFalsy();
    expect(state.orderModalData).toEqual(expectedOrderBurgerResult);
  });
});
