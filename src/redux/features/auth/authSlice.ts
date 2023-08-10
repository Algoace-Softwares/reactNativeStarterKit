import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  UsersState,
  changePasswordParamsType,
  forgotChangePasswordParamsType,
  loginParamType,
  tokenType,
  userType,
} from './authSliceType';
import {API} from '../../../api';
import {appUtils} from '../../../utils';
import {MMKV} from 'react-native-mmkv';
import {ASYNC_TOKEN_KEY, ASYNC_USER_DATA_KEY} from '../../../constants';
import {fetchUserData} from '../user/userSlice';

// local storage
const storage = new MMKV();

// initial state in app
const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  userData: null,
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
} as UsersState;

// login user
export const login = createAsyncThunk('auth/login', async (params: loginParamType, thunkAPI) => {
  const {email, password} = params;
  console.log('PARAMS[LOGIN]', email, password);
  try {
    // api call
    const response = await API.post('your/url/path/', params);
    console.log('RESPONSE[LOGIN]', response);
    if (response.data?.data) {
      // save this data localing as user data
      storage.set(ASYNC_USER_DATA_KEY, JSON.stringify(response.data));
    }

    return response;
  } catch (error: unknown) {
    console.debug('ERROR[LOGIN]:', error);
    appUtils.crashLogs({
      error: error,
      filename: 'authSlice',
      functionName: 'login',
    });
    return thunkAPI.rejectWithValue(error);
  }
});

// confirm signup
export const confirmSignup = createAsyncThunk(
  'auth/confirm/signup',
  async (params: changePasswordParamsType, thunkAPI) => {
    const {code, email, accessToken} = params;
    console.log('PARAMS[CONFIRM_SIGNUP]', code, email, accessToken);
    try {
      // api call
      const response = await API.post('your/url/path/', params);
      console.log('RESPONSE[CONFIRM_SIGNUP]', response);
      return '';
    } catch (error: unknown) {
      console.debug('ERROR[CONFIRM_SIGNUP]:', error);
      appUtils.crashLogs({
        error: error,
        filename: 'authSlice',
        functionName: 'confirm signup',
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// when user forgot his/her password
export const forgotPassword = createAsyncThunk(
  '/user/forgot/password',
  async (params: {email: string}, thunkAPI) => {
    const {email} = params;
    console.log('PARAMS[FORGOT_PASSWORD]', email);

    try {
      // api call
      const response = await API.post('your/url/path/', params);
      console.log('RESPONSE[CONFIRM_SIGNUP]', response);
      return '';
    } catch (error: unknown) {
      console.debug('ERROR[FORGOT_PASSWORD]:', error);
      appUtils.crashLogs({
        error: error,
        filename: 'authSlice',
        functionName: 'forgot password',
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// confirm forgot password
export const confirmForgotPassword = createAsyncThunk(
  '/user/forgot/change/password',
  async (params: forgotChangePasswordParamsType, thunkAPI) => {
    const {code, newPassword, accessToken} = params;
    console.log('params[CONFIRM_FORGOT_PASSWORD]', code, newPassword, accessToken);
    try {
      // api call
      const response = await API.post('your/url/path/', params);
      console.log('RESPONSE[CONFIRM_SIGNUP]', response);
      return '';
    } catch (error: unknown) {
      console.debug('ERROR[CONFIRM_FORGOT_PASSWORD]:', error);
      appUtils.crashLogs({
        error: error,
        filename: 'authSlice',
        functionName: 'confirmForgotPassword',
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// fchecking if user is logged in or not
export const fetchDataFromLocalStorage = createAsyncThunk(
  'user/fetch/local',
  async (params, thunkAPI) => {
    try {
      // getting user data as well as token
      const jsonUser = storage.getString(ASYNC_USER_DATA_KEY);
      const jsonToken = storage.getString(ASYNC_TOKEN_KEY);
      console.log('jsonUser and jsonToken', jsonUser, jsonToken);
      if (jsonUser && jsonToken) {
        // parsing async data
        const userData: userType = JSON.parse(jsonUser) as userType;
        const userToken: tokenType = JSON.parse(jsonToken) as tokenType;
        // saving local user data adn token data into state data
        thunkAPI.dispatch(updateUserToken(userToken));
        thunkAPI.dispatch(updateUserData(userData));
        // getting user latest data from server
        // api call
        await thunkAPI.dispatch(fetchUserData({userId: userData?.PK}));
      }
      return;
    } catch (error: unknown) {
      console.debug('ERROR[FETCH_USER_DATA]:', error);
      appUtils.crashLogs({
        error: error,
        filename: 'userSlice',
        functionName: 'fetchUserData',
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
    logout: state => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
      state.userData = null;
      state.tokens = {
        accessToken: '',
        refreshToken: '',
      };
    },
    // updating user data
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    // updating user token
    updateUserToken: (state, action) => {
      state.tokens = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.debug('FULLFILLED[LOGIN]: ', action.payload, state);
        state.isLoading = false;
        state.isSuccess = true;
        if (action?.payload.data?.data) {
          state.userData = action.payload.data.data;
        }
        if (action?.payload?.data?.tokens) {
          state.tokens = action.payload.data.tokens;
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.debug('REJECTED:[LOGIN] ', action.payload, state);
        state.isLoading = false;
      })
      .addCase(forgotPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.debug('FULFILLED:[FORGOT_PASSWORD]', action.payload, state);
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        console.debug('REJECTED[FORGOT_PASSWORD]:', action.payload, state);
        state.isLoading = false;
      })
      .addCase(confirmForgotPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(confirmForgotPassword.fulfilled, state => {
        console.debug('FULFILLED:[CONFIRM_FORGOT_PASSWORD]');
        state.isLoading = false;
      })
      .addCase(confirmForgotPassword.rejected, (state, action) => {
        console.debug('rejected: ', action.payload, state);
        state.isLoading = false;
      })
      .addCase(confirmSignup.pending, state => {
        state.isLoading = true;
      })
      .addCase(confirmSignup.fulfilled, (state, action) => {
        console.debug('FULFILLED[CONFIRM_SIGNUP]: ', action.payload, state);
        state.isLoading = false;
      })
      .addCase(confirmSignup.rejected, (state, action) => {
        console.debug('REJECTED[CONFIRM_SIGNUP]: ', action.payload, state);
        state.isLoading = false;
      });
  },
});

export const {reset, updateUserData, logout, updateUserToken} = authSlice.actions;
export default authSlice.reducer;
