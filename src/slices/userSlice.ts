import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const resp = await registerUserApi(data);
    localStorage.setItem('refreshToken', resp.refreshToken);
    setCookie('accessToken', resp.accessToken);
    return resp;
  }
);

export const fetchLogout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const fetchGetUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const resp = await loginUserApi(data);
    localStorage.setItem('refreshToken', resp.refreshToken);
    setCookie('accessToken', resp.accessToken);
    return resp;
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

type TUserState = {
  user: TUser;
  userOrders: TOrder[];
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string;
};

const initialState: TUserState = {
  user: {
    email: '',
    name: ''
  },
  userOrders: [],
  isLoading: false,
  isLoggedIn: false,
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
        state.isLoggedIn = false;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.error.message || '';
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = '';
        state.user = action.payload.user;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.error.message || '';
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = '';
        state.user = action.payload.user;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = {
          email: '',
          name: ''
        };
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
      })
      //--------------
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = '';
        state.user.email = '';
        state.user.name = '';
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.isLoading = false;
      });
    //----------------------
  }
});

export const {} = userSlice.actions;
export const { userSelector, isLoadingSelector, errorSelector } =
  userSlice.selectors;
export default userSlice.reducer;
