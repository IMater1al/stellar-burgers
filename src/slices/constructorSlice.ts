import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    moveUp: (state, action: PayloadAction<string>) => {
      const payloadIndex = state.ingredients.findIndex(
        (ing) => ing._id === action.payload
      );

      [state.ingredients[payloadIndex - 1], state.ingredients[payloadIndex]] = [
        state.ingredients[payloadIndex],
        state.ingredients[payloadIndex - 1]
      ];
    },
    moveDown: (state, action: PayloadAction<string>) => {
      const payloadIndex = state.ingredients.findIndex(
        (ing) => ing._id === action.payload
      );

      [state.ingredients[payloadIndex], state.ingredients[payloadIndex + 1]] = [
        state.ingredients[payloadIndex + 1],
        state.ingredients[payloadIndex]
      ];
    },
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ing) => ing._id !== action.payload
      );
    },
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder>) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    bunSelector: (state) => state.bun,
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData
  }
});

export const { addIngredient, addBun, moveUp, moveDown } =
  constructorSlice.actions;
export const {
  ingredientsSelector,
  bunSelector,
  orderRequestSelector,
  orderModalDataSelector
} = constructorSlice.selectors;
export default constructorSlice.reducer;
