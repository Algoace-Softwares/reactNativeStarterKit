import {API, LOCAL_HOST} from '../../api';
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
export const getChatRooms = async (userId: string, page: number) => {
  try {
    const chatRoomsData = await LOCAL_HOST.get(`/chat/${userId}`, {
      params: {
        page,
        limit: 20,
      },
    });
    // Handle success
    console.log('🚀 ~ getChatRooms ~ chatRoomsData:', chatRoomsData);
    const rooms = chatRoomsData?.data?.data?.items;
    if (rooms && page === 1) {
      /*
       ** updating user chat rooms
       */
      useAppStore.getState().setChatRooms(rooms);
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
