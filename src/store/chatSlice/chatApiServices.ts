import {useAppStore} from '..';
import {chatRoomType} from '../../@types';
import {LOCAL_HOST} from '../../api';

/*
 ** marking conversation as read
 */
const markConvRead = async (userId: string, roomId?: string) => {
  const updateChatRooms = useAppStore.getState().updateChatRooms;
  try {
    const response = await LOCAL_HOST.patch(`/chat/count/${roomId}/${userId}`);
    console.log('🚀 ~ markConvRead ~ reponse:', response);
    if (response.data?.data) {
      const updatedRoom = response.data.data as chatRoomType;
      updateChatRooms([updatedRoom], 'REPLACE_CHAT');
    }
  } catch (error: any) {
    console.log('🚀 ~ markConvRead ~ error:', error);
  }
};
/*
 ** get single chat room
 */
const getChatRoom = async (roomId?: string) => {
  try {
    const chatRoomData = await LOCAL_HOST.get(`/chatRoom/${roomId}`);
    console.log('🚀 ~ getChatRoom ~ reponse:', chatRoomData);
    return chatRoomData?.data?.data;
  } catch (error: any) {
    console.log('🚀 ~ getChatRoom ~ error:', error);
  }
};

export {markConvRead, getChatRoom};
