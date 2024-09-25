/*
 ** User slice type
 */

import {chatRoomType} from '../../@types';
import socketio from 'socket.io-client';

export interface chatState {
  chatRooms: chatRoomType[];
  socket: ReturnType<typeof socketio> | null;
}

export type actionType = 'PUSH_CHAT' | 'CONCAT_CHAT' | 'PUSH_TOP_CHAT' | 'REMOVE_CHAT' | 'REPLACE_CHAT';
export interface chatSlice extends chatState {
  setChatRooms: (chatRooms: chatRoomType[]) => void;
  removeChatRooms: () => void;
  setSocket: (socket: ReturnType<typeof socketio>) => void;
  updateChatRooms: (chatRoom: chatRoomType[], action: actionType) => void;
  // concatChatRooms: (chatRoom: chatRoomType[]) => void;
}
