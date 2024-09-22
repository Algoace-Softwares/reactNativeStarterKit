import {useAppStore} from '..';
import {LOCAL_HOST} from '../../api';

/*
 ** Getting user all chat rooms
 */
const getChatRooms = async (userId: string, page: number) => {
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
/*
 ** Get user chat room
 */
const getChatRoom = async chatId => {
  try {
    const chatRoomsData = await LOCAL_HOST.get(`/chat/${chatId}`);
    // Handle success
    console.log('🚀 ~ getChatRooms ~ chatRoomsData:', chatRoomsData);
    const rooms = chatRoomsData?.data?.data?.items;
  } catch (error: any) {
    console.log('🚀 ~ getChatRooms ~ error:', error);
  }
};
/*
 ** marking conversation as read
 */
const markConvRead = async (userId: string, roomId?: string) => {
  try {
    const reponse = await LOCAL_HOST.patch(`/chat/count/${roomId}/${userId}`);

    console.log('🚀 ~ markConvRead ~ reponse:', reponse);
  } catch (error: any) {
    console.log('🚀 ~ markConvRead ~ error:', error);
  }
};

export {markConvRead, getChatRooms};
