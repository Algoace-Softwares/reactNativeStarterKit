import {StateCreator} from 'zustand';
import {userSlice, userState} from './type';
import {API} from '../../api';
import Toast from 'react-native-simple-toast';
import {sliceResetFns} from '..';

/*
 ** Initial states
 */
const initialState: userState = {
  userError: false,
  userLoading: false,
  userSuccess: false,
  userMessage: '',
  bears: 0,
};

export const createUserSlice: StateCreator<userSlice> = set => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,
    addBear: () => set(state => ({bears: state.bears + 1})),
    /*
     ** change password functions
     */
    changePassword: async (userId: string, oldPassword: string, newPassword: string, accessToken: string) => {
      set({userLoading: true, userError: false, userMessage: ''});
      try {
        // Call API for changePassword logic
        // Example:
        const response = await API.post('/auth/password', {userId, oldPassword, newPassword, accessToken});
        console.log('🚀 ~ changePassword: ~ response:', response);
        // Handle success
        set({userLoading: false, userSuccess: true, userMessage: 'Password changed successfully'});
        Toast.show('Password changed successfully', Toast.LONG);
      } catch (error: any) {
        console.log('🚀 ~ changePassword: ~ error:', error);
        set({userLoading: false, userError: true, userMessage: error.message || 'Change password failed'});
      }
    },
  };
};
