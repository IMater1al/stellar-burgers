import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { createAppAsyncThunk } from '../utils/createAppAsyncThunk';

export const fetchIngredients = createAppAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

type TIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  error: string;
};

const initialState: TIngredientsState = {
  data: [],
  isLoading: false,
  error: ''
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectBuns: createSelector(
      (state: TIngredientsState) => state.data,
      (data) => data.filter((ing) => ing.type === 'bun')
    ),
    selectMains: createSelector(
      (state: TIngredientsState) => state.data,
      (data) => data.filter((ing) => ing.type === 'main')
    ),
    selectSauces: createSelector(
      (state: TIngredientsState) => state.data,
      (data) => data.filter((ing) => ing.type === 'sauce')
    )
    // selectBuns: (state) => {
    //   console.log(123);
    //   return state.data.filter((ing) => ing.type === 'bun');
    // },
    // selectMains: (state) => state.data.filter((ing) => ing.type === 'main'),
    // selectSauces: (state) => state.data.filter((ing) => ing.type === 'sauce')
  },
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : '';
      });
  }
});

export default ingredientsSlice.reducer;
export const { selectSauces, selectBuns, selectMains } =
  ingredientsSlice.selectors;
