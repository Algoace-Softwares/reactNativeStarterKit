import {LOCAL_HOST} from '../../api';

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
