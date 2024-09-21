import { describe, expect, test } from '@jest/globals';
import userSliceReducer, {
  fetchGetUser,
  fetchLoginUser,
  fetchLogout,
  fetchRegisterUser,
  fetchUpdateUser
} from './userSlice';

beforeEach(() => {
  jest.clearAllMocks();
});

export const initialState = {
  user: {
    email: '',
    name: ''
  },
  userOrders: [],
  isLoading: false,
  isLoggedIn: false,
  error: ''
};

const registerData = {
  name: '123',
  password: '123',
  email: 'asd@mail.ru'
};

const initialUser = {
  email: '',
  name: ''
};

const loginData = {
  password: '123',
  email: 'asd@mail.ru'
};

const expectedUserResponse = {
  success: true,
  refreshToken: 'string',
  accessToken: 'string',
  user: { email: 'asd@mail.ru', name: '123' }
};

describe('тест слайса пользователя', () => {
  test('инициализация редьюсера ', () => {
    expect(userSliceReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('тест вызова fetchRegisterUser Request ', () => {
    const state = userSliceReducer(
      initialState,
      fetchRegisterUser.pending('', registerData)
    );
    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBe('');
  });

  test('тест вызова fetchRegisterUser Reject ', () => {
    const state = userSliceReducer(
      initialState,
      fetchRegisterUser.rejected(new Error('ошибка'), '', registerData)
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.isLoggedIn).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова fetchRegisterUser Success ', () => {
    const state = userSliceReducer(
      initialState,
      fetchRegisterUser.fulfilled(expectedUserResponse, '', registerData)
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.isLoggedIn).toBeTruthy();
    expect(state.user).toEqual(expectedUserResponse.user);
  });

  test('тест вызова fetchLogout Request ', () => {
    const state = userSliceReducer(initialState, fetchLogout.pending(''));
    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBe('');
  });

  test('тест вызова fetchLogout Reject ', () => {
    const state = userSliceReducer(
      initialState,
      fetchLogout.rejected(new Error('ошибка'), '')
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова fetchLogout Success ', () => {
    const state = userSliceReducer(
      initialState,
      fetchLogout.fulfilled(undefined, '')
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.isLoggedIn).toBeFalsy();
    expect(state.user).toEqual(initialUser);
  });

  test('тест вызова fetchUpdateUser Request ', () => {
    const state = userSliceReducer(
      initialState,
      fetchUpdateUser.pending('', registerData)
    );
    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBe('');
  });

  test('тест вызова fetchUpdateUser Reject ', () => {
    const state = userSliceReducer(
      initialState,
      fetchUpdateUser.rejected(new Error('ошибка'), '', registerData)
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова fetchUpdateUser Success ', () => {
    const state = userSliceReducer(
      initialState,
      fetchUpdateUser.fulfilled(expectedUserResponse, '', registerData)
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.user).toEqual(expectedUserResponse.user);
  });

  test('тест вызова fetchGetUser Request ', () => {
    const state = userSliceReducer(initialState, fetchGetUser.pending(''));
    expect(state.isLoading).toBeTruthy();
    expect(state.isLoggedIn).toBeFalsy();
    expect(state.error).toBe('');
  });

  test('тест вызова fetchGetUser Reject ', () => {
    const state = userSliceReducer(
      initialState,
      fetchGetUser.rejected(new Error('ошибка'), '')
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.isLoggedIn).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова fetchGetUser Success ', () => {
    const state = userSliceReducer(
      initialState,
      fetchGetUser.fulfilled(expectedUserResponse, '')
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.isLoggedIn).toBeTruthy();
    expect(state.user).toEqual(expectedUserResponse.user);
  });

  test('тест вызова fetchLoginUser Request ', () => {
    const state = userSliceReducer(
      initialState,
      fetchLoginUser.pending('', loginData)
    );
    expect(state.isLoading).toBeTruthy();
    expect(state.isLoggedIn).toBeFalsy();
    expect(state.error).toBe('');
  });

  test('тест вызова fetchLoginUser Reject ', () => {
    const state = userSliceReducer(
      initialState,
      fetchLoginUser.rejected(new Error('ошибка'), '', loginData)
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.isLoggedIn).toBeFalsy();
    expect(state.error).toBe('ошибка');
  });

  test('тест вызова fetchLoginUser Success ', () => {
    const state = userSliceReducer(
      initialState,
      fetchLoginUser.fulfilled(expectedUserResponse, '', loginData)
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.isLoggedIn).toBeTruthy();
    expect(state.error).toBe('');
    expect(state.user).toEqual(expectedUserResponse.user);
  });
});
