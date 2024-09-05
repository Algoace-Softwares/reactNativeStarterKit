import {StateCreator} from 'zustand';
import {sliceResetFns} from '../utils';
import {userSlice, userState} from './types';
import {chatRoomType} from '../../@types';

/*
 ** Initial states
 */
const initialState: userState = {
  chatRooms: [],
};

export const createUserSlice: StateCreator<userSlice> = set => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,
    setChatRooms: (chatRooms: chatRoomType[]) => {
      set({chatRooms});
    },
  };
};
