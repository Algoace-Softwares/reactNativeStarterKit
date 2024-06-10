import {StateCreator} from 'zustand';
import Toast from 'react-native-simple-toast';
import {API, AUTH_API} from '../../api';
import {appUtils} from '../../utils';
import {navigate} from '../../routes/navigationUtilities';
import {authSlice, authState, emailPassType, SignUpParams, tokenType} from './type';
import {ASYNC_TOKEN_KEY, ASYNC_USER_DATA_KEY} from '../../constants';
import {loadStorage, saveStorage, saveStringStorage} from '../../utils/storage/storage';
import {userDataType} from '../../@types';
import {resetAllSlices, sliceResetFns} from '../utils';
import {useAppStore} from '..';
/*
 ** Initial states
 */
const initialState: authState = {
  authError: false,
  authLoading: false,
  authSuccess: false,
  authMessage: '',
  userData: undefined,
  fishes: 0,
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
     ** Slice Functions
     */
    /*
     ** Login functions
     */
    signIn: async (params: emailPassType) => {
      console.log('🚀 ~ signIn: ~ params:', params);
      set({authLoading: true, authError: false, authMessage: ''});
      try {
        const response = await AUTH_API.post('/auth/signin', {
          emailAddress: params.email,
          password: params.password,
        });

        console.log('🚀 ~ signIn: ~ response:', response);
        const user = response.data;
        set({authLoading: false, authSuccess: true, userData: user?.data, tokens: user?.tokens});
        saveStorage(ASYNC_TOKEN_KEY, user?.tokens);
        saveStorage(ASYNC_USER_DATA_KEY, user?.data);
      } catch (error: any) {
        console.log('🚀 ~ signIn: ~ error:', error);
        set({authLoading: false, authError: true, authMessage: error.message || 'Sign-in failed'});
        handleAuthContextError('signIn', error);
      }
    },
    /*
     ** signup functions
     */
    signUp: async (params: SignUpParams) => {
      set({authLoading: true, authError: false, authMessage: ''});
      try {
        const response = await AUTH_API.post('/auth/signup', params);
        const user = response.data;
        set({authLoading: false, authSuccess: true, userData: user, tokens: user?.tokens});
      } catch (error: any) {
        console.log('🚀 ~ signUp: ~ error:', error);
        set({authLoading: false, authError: true, authMessage: error.message || 'Sign-up failed'});
        handleAuthContextError('signUp', error);
      }
    },
    /*
     ** forgot password
     */
    forgotPassword: async (email: string) => {
      set({authLoading: true, authError: false, authMessage: ''});
      try {
        // Call API for forgotPassword logic
        // Example:
        const response = await AUTH_API.post('/auth/forgot/password', {email});
        console.log('🚀 ~ forgotPassword: ~ response:', response);
        // Handle success
        set({authLoading: false, authSuccess: true, authMessage: 'Password reset email sent successfully'});
      } catch (error: any) {
        console.log('🚀 ~ forgotPassword: ~ error:', error);
        set({authLoading: false, authError: true, authMessage: error.message || 'Forgot password failed'});
        handleAuthContextError('forgotPassword', error);
      }
    },
    /*
     ** forgot change password function
     */
    forgotChangePassword: async (email: string, password: string, code: string) => {
      set({authLoading: true, authError: false, authMessage: ''});
      try {
        // Call API for forgotChangePassword logic
        // Example:
        const response = await AUTH_API.post('/auth/forgot/change/password', {email, password, code});
        console.log('🚀 ~ forgotChangePassword: ~ response:', response);
        // Handle success
        set({authLoading: false, authSuccess: true, authMessage: 'Password changed successfully'});
      } catch (error: any) {
        console.log('🚀 ~ forgotChangePassword: ~ error:', error);
        set({authLoading: false, authError: true, authMessage: error.message || 'Change password failed'});
        handleAuthContextError('forgotChangePassword', error);
      }
    },
    /*
     ** confirm signup functions
     */
    confirmSignup: async (email: string, code: string) => {
      set({authLoading: true, authError: false, authMessage: ''});
      try {
        // Call API for confirmSignup logic
        // Example:
        const response = await AUTH_API.post('/auth/confirm', {email, code});
        console.log('🚀 ~ confirmSignup: ~ response:', response);
        // Handle success
        set({authLoading: false, authSuccess: true, authMessage: 'Account confirmed successfully'});
      } catch (error: any) {
        console.log('🚀 ~ confirmSignup: ~ error:', error);
        set({authLoading: false, authError: true, authMessage: error.message || 'Confirm signup failed'});
        handleAuthContextError('confirmSignup', error);
      }
    },
    /*
     ** update tokening state as well as async
     */
    updateToken: tokens => {
      set({tokens});
      saveStringStorage(ASYNC_TOKEN_KEY, JSON.stringify(tokens));
    },
    updateUserData: user => {
      set({userData: user});
      saveStringStorage(ASYNC_USER_DATA_KEY, JSON.stringify(user));
    },
    /*
     ** resend code functions
     */
    resendCode: async (email: string) => {
      set({authLoading: true, authError: false, authMessage: ''});
      try {
        // Call API for resendCode logic
        // Example:
        const response = await AUTH_API.post('/auth/code', {email});
        console.log('🚀 ~ resendCode: ~ response:', response);
        // Handle success
        set({authLoading: false, authSuccess: true, authMessage: 'Code resent successfully'});
      } catch (error: any) {
        console.log('🚀 ~ resendCode: ~ error:', error);
        set({authLoading: false, authError: true, authMessage: error.message || 'Resend code failed'});
        handleAuthContextError('resendCode', error);
      }
    },
    /*
     ** sign out functions
     */
    signOut: async () => {
      set({authLoading: true, authError: false, authMessage: ''});
      try {
        // Call API for signOut logic
        const user = useAppStore.getState().userData as userDataType;
        const tokens = useAppStore.getState().tokens as tokenType;

        // Example:
        const response = await AUTH_API.post('/auth/logout', {userId: user?.PK, accessToken: tokens?.accessToken});
        console.log('🚀 ~ signOut: ~ response:', response);
        // Handle success
        set({authLoading: false, authSuccess: true, authMessage: 'Signed out successfully'});

        resetAllSlices();
      } catch (error: any) {
        console.log('🚀 ~ signOut: ~ error:', error);
        set({authLoading: false, authError: true, authMessage: error.message || 'Sign out failed'});
        handleAuthContextError('signOut', error);
      }
    },
    /*
     ** delete user functions
     */
    deleteUser: async (userId: string) => {
      set({authLoading: true, authError: false, authMessage: ''});
      try {
        const response = await AUTH_API.delete(`/user/${userId}`);
        // Handle success
        console.log('🚀 ~ deleteUser: ~ response:', response);
        set({authLoading: false, authSuccess: true, authMessage: 'delete User successfully'});
      } catch (error: any) {
        console.log('🚀 ~ deleteUser: ~ error:', error);
        set({authLoading: false, authError: true, authMessage: error.message || 'delete user failed'});
        handleAuthContextError('signOut', error);
      }
    },
    /*
     ** fetching user data from
     */
    fetchUserDataLocal: async () => {
      set({authLoading: true, authError: false, authMessage: ''});
      try {
        let user = loadStorage(ASYNC_USER_DATA_KEY) as userDataType;
        const userToken = loadStorage(ASYNC_TOKEN_KEY) as tokenType;

        if (user && 'PK' in user && 'accessToken' in userToken) {
          console.log('user is logged in');
          set({userData: user, tokens: userToken});
          // getting latest user data amd
          const response = await API.get(`/user/${user.PK}`);
          console.log('🚀 ~ fetchUserDataLocal: ~ response:', response);
          user = response?.data?.data;
          // updating latest data in local as well as in store
          useAppStore.getState().updateUserData(user);
        }
        set({authLoading: false, authSuccess: true});
      } catch (error: any) {
        console.log('🚀 ~ fetchUserDataLocal: ~ error:', error);
        set({authLoading: false, authError: true, authMessage: error.message || 'fetchUserDataLocal failed'});
      }
    },
  };
};
/*
 ** Hanlding common error error
 */
const handleAuthContextError = (funcName = '', error: unknown | any) => {
  console.log(`ERROR[${funcName}]`, error);
  // crashLogs('actions.js', funcName, error);
  appUtils.crashLogs(error);
  // callback();
  if (error?.message === 'Interval server error') {
    Toast.show('Something went wrong try again later', Toast.LONG);
    return;
  }
  if (error?.response?.data?.message === 'Internal Server Error') {
    Toast.show('Something went wrong try again later', Toast.LONG);
    return;
  }
  if (error?.response?.data?.message === 'User is disabled.') {
    Toast.show('User is disabled kindly contact admin', Toast.LONG);
    navigate('AccountDisabledScreen');
    return;
  }
  if (error?.response?.data?.message === 'Access Token has been revoked') {
    resetAllSlices();
    return;
  }
  if (error?.response?.data?.message === 'Unable to verify user') {
    Toast.show('User is disabled or deleted kindly contact admin', Toast.LONG);
    navigate('AccountDisabledScreen');
    return;
  }
  if (error?.message === 'Network Error') {
    Toast.show('Internet Connecten error. try again later', Toast.LONG);
    return;
  }
  if (error?.response?.data?.message === 'User is not confirmed.') {
    Toast.show('User is not confirmed', Toast.LONG);
  }
  if (error?.response?.data?.message) {
    const extractData = error.response.data.message;
    return Toast.show(extractData, Toast.LONG);
  }
  return Toast.show(error, Toast.LONG);
};
