import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createAppAsyncThunk } from '../utils/createAppAsyncThunk';

export const fetchFeeds = createAsyncThunk(
  'feeds/getAll',
  async () => await getFeedsApi()
);

export const fetchGetUserOrders = createAsyncThunk(
  'user/getOrders',
  async () => await getOrdersApi()
);

export const fetchGetOrderByNumberApi = createAsyncThunk(
  'user/getOrderByNumber',
  async (number: string) => await getOrderByNumberApi(Number(number))
);

type TOrderState = {
  orders: TOrder[];
  userOrders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string;
};

const initialState: TOrderState = {
  orders: [],
  userOrders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  orderRequest: false,
  orderModalData: null,
  error: ''
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    clearModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    ordersSelector: (state) => state.orders,
    feedSelector: (state) => state.feed,
    userOrdersSelector: (state) => state.userOrders
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || '';
      })
      .addCase(fetchGetUserOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchGetUserOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchGetUserOrders.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(fetchGetOrderByNumberApi.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchGetOrderByNumberApi.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(fetchGetOrderByNumberApi.rejected, (state, action) => {
        state.orderRequest = false;
      });
  }
});

export const { clearOrders, clearModalData } = orderSlice.actions;
export const {
  orderRequestSelector,
  orderModalDataSelector,
  ordersSelector,
  feedSelector,
  userOrdersSelector
} = orderSlice.selectors;
export default orderSlice.reducer;
