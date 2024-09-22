/*
 ** User slice type
 */

import {chatRoomType} from '../../@types';
import socketio from 'socket.io-client';

export interface chatState {
  chatRooms: chatRoomType[];
  socket: ReturnType<typeof socketio> | null;
}
export interface chatSlice extends chatState {
  setChatRooms: (chatRooms: chatRoomType[]) => void;
  setSocket: (socket: ReturnType<typeof socketio>) => void;
  pushChatRooms: (chatRoom: chatRoomType) => void;
}
