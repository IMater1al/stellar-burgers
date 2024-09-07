import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../services/store';

type TErrorResponse = {
  success: boolean;
  message: string;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: TErrorResponse;
}>();
