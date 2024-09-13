import {API} from '../../api';
import Toast from 'react-native-simple-toast';

export const changePassword = async (userId: string, oldPassword: string, newPassword: string, accessToken: string) => {
  try {
    // Call API for changePassword logic
    const response = await API.post('/auth/password', {userId, oldPassword, newPassword, accessToken});
    console.log('🚀 ~ changePassword: ~ response:', response);
    // Handle success
    Toast.show('Password changed successfully', Toast.LONG);
  } catch (error: any) {
    console.log('🚀 ~ changePassword: ~ error:', error);
  }
};
