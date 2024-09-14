import {
  getFeedsApi,
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { createAppAsyncThunk } from '../utils/createAppAsyncThunk';
import { setCookie } from '../utils/cookie';

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const resp = await registerUserApi(data);
    localStorage.setItem('refreshToken', resp.refreshToken);
    setCookie('accessToken', resp.accessToken);
    return resp;
  }
);

export const fetchGetUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const fetchLoginUser = createAppAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const resp = await loginUserApi(data);
    localStorage.setItem('refreshToken', resp.refreshToken);
    setCookie('accessToken', resp.accessToken);
    return resp;
  }
);

export const fetchUpdateUser = createAppAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

type TUserState = {
  user: TUser;
  isLoading: boolean;
  error: string;
};

const initialState: TUserState = {
  user: {
    email: '',
    name: ''
  },
  isLoading: false,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userSelector: (state) => state.user,
    isLoadingSelector: (state) => state.isLoading,
    errorSelector: (state) => state.error
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.user = action.payload.user;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.user = action.payload.user;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.user = action.payload.user;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const {} = userSlice.actions;
export const { userSelector, isLoadingSelector, errorSelector } =
  userSlice.selectors;
export default userSlice.reducer;
