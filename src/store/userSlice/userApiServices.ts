import {API, AUTH_API} from '../../api';
import Toast from 'react-native-simple-toast';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useAppStore} from '..';

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
/*
 ** Getting user all chat rooms
 */
export const getChatRooms = async (userId: string) => {
  try {
    const chatRoomsData = await AUTH_API.get(`/chat/${userId}`);
    // Handle success
    console.log('🚀 ~ getChatRooms ~ chatRoomsData:', chatRoomsData);
    if (chatRoomsData?.data) {
      /*
       ** updating user chat rooms
       */
      useAppStore.getState().setChatRooms(chatRoomsData?.data);
    }
  } catch (error: any) {
    console.log('🚀 ~ getChatRooms ~ error:', error);
  }
};

export const useDogs = () => {
  return useQuery({
    queryKey: ['dogsData'],
    queryFn: () => axios.get('https://api.github.com/repos/tannerlinsley/react-query').then(res => res.data),
  });
};
