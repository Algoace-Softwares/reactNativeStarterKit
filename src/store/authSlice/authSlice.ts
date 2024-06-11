import {StateCreator} from 'zustand';
import {sliceResetFns} from '../utils';
import {saveStorage, saveStringStorage} from '../../utils/storage/storage';
import {ASYNC_TOKEN_KEY, ASYNC_USER_DATA_KEY} from '../../constants';
import {authSlice, authState} from './types';

const initialState: authState = {
  userData: undefined,
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
};

export const createAuthSlice: StateCreator<authSlice> = set => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,
    /*
     ** update tokening state as well as async
     */
    updateToken: tokens => {
      set({tokens});
      saveStringStorage(ASYNC_TOKEN_KEY, JSON.stringify(tokens));
    },
    /*
     ** updating user data
     */
    updateUserData: user => {
      set({userData: user});
      saveStringStorage(ASYNC_USER_DATA_KEY, JSON.stringify(user));
    },
    updateUserDataToken(user, tokens) {
      set({userData: user, tokens});
      saveStorage(ASYNC_TOKEN_KEY, user);
      saveStorage(ASYNC_USER_DATA_KEY, tokens);
    },
  };
};
