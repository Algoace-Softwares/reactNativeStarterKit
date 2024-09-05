/*
 ** User slice type
 */

import {chatRoomType} from '../../@types';

export interface userState {
  chatRooms: chatRoomType[];
}
export interface userSlice extends userState {
  setChatRooms: (chatRooms: chatRoomType[]) => void;
}
