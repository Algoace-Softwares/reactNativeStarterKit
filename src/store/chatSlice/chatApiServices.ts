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

export {markConvRead};
