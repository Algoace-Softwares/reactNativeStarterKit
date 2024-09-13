import {StateCreator} from 'zustand';
import {sliceResetFns} from '../utils';
import {chatSlice, chatState} from './types';
import {chatRoomType} from '../../@types';
import socketio from 'socket.io-client';

/*
 ** Initial states
 */
const initialState: chatState = {
  chatRooms: [],
  socket: null,
};

export const createChatSlice: StateCreator<chatSlice> = set => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,
    setSocket: (socket: ReturnType<typeof socketio>) => {
      set({socket});
    },
    setChatRooms: (chatRooms: chatRoomType[]) => {
      set({chatRooms});
    },
  };
};
