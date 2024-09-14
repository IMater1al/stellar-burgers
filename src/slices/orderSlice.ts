import { getFeedsApi } from '@api';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createAppAsyncThunk } from '../utils/createAppAsyncThunk';

export const fetchFeeds = createAppAsyncThunk(
  'feeds/getAll',
  async () => await getFeedsApi()
);

type TOrderState = {
  orders: TOrder[];
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
    setOrderModalData: (state, action: PayloadAction<TOrder>) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    orderDataSelector: createSelector(
      [
        (state: TOrderState) => state.orders,
        (state: TOrderState, number: string) => number
      ],
      (orders, orderNumber) =>
        orders.find((order) => order.number === Number(orderNumber))
    ),
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    ordersSelector: (state) => state.orders,
    feedSelector: (state) => state.feed
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
        state.error = action.payload?.message || '';
      });
  }
});

export const { clearOrders } = orderSlice.actions;
export const {
  orderRequestSelector,
  orderModalDataSelector,
  ordersSelector,
  feedSelector,
  orderDataSelector
} = orderSlice.selectors;
export default orderSlice.reducer;
