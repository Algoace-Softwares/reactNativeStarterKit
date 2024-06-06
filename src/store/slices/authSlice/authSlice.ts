import {StateCreator} from 'zustand';
import {authSlice, authState, emailPassType, SignUpParams} from './type';
import Toast from 'react-native-simple-toast';
import {API} from '../../../api';
import {appUtils} from '../../../utils';
import {navigate} from '../../../routes/navigationUtilities';
/*
 ** Initial states
 */
const initialState: authState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  userData: undefined,
  fishes: 0,
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
};

export const createAuthSlice: StateCreator<authSlice> = set => ({
  ...initialState,
  /*
   ** Slice Functions
   */
  /*
   ** Login functions
   */
  signIn: async (params: emailPassType) => {
    set({isLoading: true, isError: false, message: ''});
    try {
      const response = await API.post('/auth/signin', params);
      const userData = response.data;
      set({isLoading: false, isSuccess: true, userData: userData?.data, tokens: userData?.data});
    } catch (error: any) {
      console.log('🚀 ~ signIn: ~ error:', error);
      set({isLoading: false, isError: true, message: error.message || 'Sign-in failed'});
      handleAuthContextError('signIn', error);
    }
  },
  /*
   ** signup functions
   */
  signUp: async (params: SignUpParams) => {
    set({isLoading: true, isError: false, message: ''});
    try {
      const response = await API.post('/auth/signup', params);
      const userData = response.data;
      set({isLoading: false, isSuccess: true, userData: userData?.data, tokens: userData?.data});
    } catch (error: any) {
      console.log('🚀 ~ signUp: ~ error:', error);
      set({isLoading: false, isError: true, message: error.message || 'Sign-up failed'});
      handleAuthContextError('signUp', error);
    }
  },
  /*
   ** forgot password
   */
  forgotPassword: async (email: string) => {
    set({isLoading: true, isError: false, message: ''});
    try {
      // Call API for forgotPassword logic
      // Example:
      const response = await API.post('/auth/forgot/password', {email});
      console.log('🚀 ~ forgotPassword: ~ response:', response);
      // Handle success
      set({isLoading: false, isSuccess: true, message: 'Password reset email sent successfully'});
    } catch (error: any) {
      console.log('🚀 ~ forgotPassword: ~ error:', error);
      set({isLoading: false, isError: true, message: error.message || 'Forgot password failed'});
      handleAuthContextError('forgotPassword', error);
    }
  },
  /*
   ** forgot change password function
   */
  forgotChangePassword: async (email: string, password: string, code: string) => {
    set({isLoading: true, isError: false, message: ''});
    try {
      // Call API for forgotChangePassword logic
      // Example:
      const response = await API.post('/auth/forgot/change/password', {email, password, code});
      console.log('🚀 ~ forgotChangePassword: ~ response:', response);
      // Handle success
      set({isLoading: false, isSuccess: true, message: 'Password changed successfully'});
    } catch (error: any) {
      console.log('🚀 ~ forgotChangePassword: ~ error:', error);
      set({isLoading: false, isError: true, message: error.message || 'Change password failed'});
      handleAuthContextError('forgotChangePassword', error);
    }
  },
  /*
   ** confirm signup functions
   */
  confirmSignup: async (email: string, code: string) => {
    set({isLoading: true, isError: false, message: ''});
    try {
      // Call API for confirmSignup logic
      // Example:
      const response = await API.post('/auth/confirm', {email, code});
      console.log('🚀 ~ confirmSignup: ~ response:', response);
      // Handle success
      set({isLoading: false, isSuccess: true, message: 'Account confirmed successfully'});
    } catch (error: any) {
      console.log('🚀 ~ confirmSignup: ~ error:', error);
      set({isLoading: false, isError: true, message: error.message || 'Confirm signup failed'});
      handleAuthContextError('confirmSignup', error);
    }
  },
  /*
   ** change password functions
   */
  changePassword: async (userId: string, oldPassword: string, newPassword: string, accessToken: string) => {
    set({isLoading: true, isError: false, message: ''});
    try {
      // Call API for changePassword logic
      // Example:
      const response = await API.post('/auth/password', {userId, oldPassword, newPassword, accessToken});
      console.log('🚀 ~ changePassword: ~ response:', response);
      // Handle success
      set({isLoading: false, isSuccess: true, message: 'Password changed successfully'});
    } catch (error: any) {
      console.log('🚀 ~ changePassword: ~ error:', error);
      set({isLoading: false, isError: true, message: error.message || 'Change password failed'});
      handleAuthContextError('changePassword', error);
    }
  },
  /*
   ** reset token functions
   */
  resetToken: () => set(() => ({tokens: {accessToken: '', refreshToken: ''}})),
  /*
   ** resend code functions
   */
  resendCode: async (email: string) => {
    set({isLoading: true, isError: false, message: ''});
    try {
      // Call API for resendCode logic
      // Example:
      const response = await API.post('/auth/code', {email});
      console.log('🚀 ~ resendCode: ~ response:', response);
      // Handle success
      set({isLoading: false, isSuccess: true, message: 'Code resent successfully'});
    } catch (error: any) {
      console.log('🚀 ~ resendCode: ~ error:', error);
      set({isLoading: false, isError: true, message: error.message || 'Resend code failed'});
      handleAuthContextError('resendCode', error);
    }
  },
  /*
   ** sign out functions
   */
  signOut: async (userId: string, accessToken: string) => {
    set({isLoading: true, isError: false, message: ''});
    try {
      // Call API for signOut logic
      // Example:
      const response = await API.post('/auth/logout', {userId, accessToken});
      console.log('🚀 ~ signOut: ~ response:', response);
      // Handle success
      set({isLoading: false, isSuccess: true, message: 'Signed out successfully'});
    } catch (error: any) {
      console.log('🚀 ~ signOut: ~ error:', error);
      set({isLoading: false, isError: true, message: error.message || 'Sign out failed'});
      handleAuthContextError('signOut', error);
    }
  },
  /*
   ** delete user functions
   */
  deleteUser: async (userId: string) => {
    set({isLoading: true, isError: false, message: ''});
    try {
      // Call API for signOut logic
      // Example:
      const response = await API.delete(`/user/${userId}`);
      // Handle success
      console.log('🚀 ~ deleteUser: ~ response:', response);
      set({isLoading: false, isSuccess: true, message: 'delete User successfully'});
    } catch (error: any) {
      console.log('🚀 ~ deleteUser: ~ error:', error);
      set({isLoading: false, isError: true, message: error.message || 'delete user failed'});
      handleAuthContextError('signOut', error);
    }
  },
});
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
