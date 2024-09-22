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
    // New method to push a chat room to the top
    pushChatRooms: (chatRoom: chatRoomType, isNew: boolean) => {
      if (isNew) {
        set(state => ({
          chatRooms: [chatRoom, ...state.chatRooms],
        }));
      } else {
        // Move the existing chat room to the top of the list
        const updatedChatRooms = chatRooms.filter(chatRoom => chatRoom._id !== roomId);
        setChatRooms([chatRoomExists, ...updatedChatRooms]);
      }
    },
    // New method to concatenate an array of chat rooms into the current chat rooms
    concatChatRooms: (newChatRooms: chatRoomType[]) => {
      set(state => ({
        chatRooms: [...state.chatRooms, ...newChatRooms],
      }));
    },
  };
};
