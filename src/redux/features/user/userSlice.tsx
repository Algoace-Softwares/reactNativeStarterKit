import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ChangePasswordType, UsersStateType, updateUserDataType} from './userSliceType';
import {appUtils} from '../../../utils';
import {API} from '../../../api';
import {MMKV} from 'react-native-mmkv';
import {ASYNC_USER_DATA_KEY} from '../../../constants';

// local storage
const storage = new MMKV();

//inital states
const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  userData: {},
} as UsersStateType;

// UPDATING USER
export const updateUser = createAsyncThunk(
  'user/update',
  async (params: {updatedUserData: updateUserDataType}, thunkAPI) => {
    const {updatedUserData} = params;
    console.log('INCOMIND_DATA[UPDATE_USER]', updatedUserData);
    try {
      // api call
      const response = await API.patch('your/url/path', params);
      console.log('RESPONSE[UPDATE_USER]', response);
      return response.data;
    } catch (error: unknown) {
      console.debug('ERROR[UPDATE_USER]:', error);
      appUtils.crashLogs({
        error: error,
        filename: 'userSlice',
        functionName: 'updateUser',
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// change user password
export const changePassword = createAsyncThunk(
  'user/change/password',
  async (params: ChangePasswordType, thunkAPI) => {
    const {oldPassword, newPassword, accessToken, userId} = params;
    console.log('PARAMS[CHANGE_PASSWORD]', oldPassword, newPassword, accessToken, userId);
    try {
      // api call
      const response = await API.patch('your/url/path', params);
      console.log('RESPONSE[CHANGE_PASSWORD]', response);
      return response.data;
    } catch (error: unknown) {
      console.debug('ERROR[CHANGE_PASSWORD]:', error);
      appUtils.crashLogs({
        error: error,
        filename: 'userSlice',
        functionName: 'changePassword',
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// fetch user data to get latest server user data
export const fetchUserData = createAsyncThunk(
  'user/fetch/data',
  async (params: {userId: string}, thunkAPI) => {
    console.log('PARAMS[FETCH_USER_DATA]', params);
    try {
      // api call
      const response = await API.patch(`your/url/path/${params.userId}`);
      console.log('RESPONSE[CHANGE_PASSWORD]', response);
      if (response.data?.data) {
        const userData = response.data?.data;
        // save this data localing  and on state data
        storage.set(userData, ASYNC_USER_DATA_KEY);
        thunkAPI.dispatch(updateUserData(userData));
      }
      return response.data;
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

// delete user
export const deleteUser = createAsyncThunk(
  'user/id',
  async (params: {userId: string}, thunkAPI) => {
    console.log('PARAMS[DELETE_USER]', params);
    try {
      // api call
      const response = await API.delete(`your/url/path/${params.userId}`);
      console.log('RESPONSE[DELETE_USER]', response);
      if (response.status === 200) {
        // remove this data localing as user data
      }
      return response.data;
    } catch (error: unknown) {
      console.debug('ERROR[DELETE_USER]:', error);
      appUtils.crashLogs({
        error: error,
        filename: 'userSlice',
        functionName: 'deleteUser',
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
    // updating user data
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUser.pending, state => {
        // console.debug('PENDING STATE UPDATE USER');
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.debug('FULFILLED[UPDATE_USER]: ');
        state.isLoading = false;
        state.userData = action.payload.data.data;
      })
      .addCase(updateUser.rejected, state => {
        console.debug('REJECTED[UPDATE_USER]: ');
        state.isLoading = false;
      })
      .addCase(changePassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, state => {
        console.debug('fulfilled:[CHANGE_PASSWORD] ');
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, state => {
        console.debug('REJECTED[CHANGE_PASSWORD]: ');
        state.isLoading = false;
      })
      .addCase(deleteUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, state => {
        console.debug('FULFILLED:[DELETE_USER] ');
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, state => {
        console.debug('REJECTED[DELETE_USER]: ');
        state.isLoading = false;
      });
  },
});

export const {reset, updateUserData} = userSlice.actions;
export default userSlice.reducer;
