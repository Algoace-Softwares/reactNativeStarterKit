import {StateCreator} from 'zustand';
import {sliceResetFns} from '../utils';
import {actionType, chatSlice, chatState} from './types';
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
    removeChatRooms: () => {
      set({chatRooms: []});
    },
    // Updated method to update chat list
    updateChatRooms: (chatRooms: chatRoomType[], action: actionType) => {
      set(state => {
        let updatedChatRooms = [...state.chatRooms];

        switch (action) {
          case 'PUSH_CHAT':
            updatedChatRooms = [...chatRooms, ...updatedChatRooms];
            break;
          case 'CONCAT_CHAT':
            updatedChatRooms = [...updatedChatRooms, ...chatRooms];
            break;
          case 'REMOVE_CHAT':
            updatedChatRooms = updatedChatRooms.filter(room => room._id !== chatRooms[0]._id);
            break;
          case 'PUSH_TOP_CHAT':
            // Move existing chat room to the top of the list
            updatedChatRooms = [...chatRooms, ...updatedChatRooms.filter(room => room._id !== chatRooms[0]._id)];

            break;
          case 'REPLACE_CHAT':
            // Replace the existing chat room with the updated one
            updatedChatRooms = updatedChatRooms.map(room => (room._id === chatRooms[0]._id ? chatRooms[0] : room));
            break;
          default:
            break;
        }

        return {chatRooms: updatedChatRooms};
      });
    },
  };
};
