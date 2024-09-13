import {create} from 'zustand';
import {authSlice} from './authSlice/types';
import {appSlice} from './appSlice/types';
import {userSlice} from './userSlice/types';
import {createUserSlice} from './userSlice/userSlice';
import {createAuthSlice} from './authSlice/authSlice';
import {createAppSlice} from './appSlice/appSlice';
import {chatSlice} from './chatSlice/types';
import {createChatSlice} from './chatSlice/chatSlice';
/*
 ** Main zustand store
 */
export const useAppStore = create<authSlice & appSlice & userSlice & chatSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createChatSlice(...a),
  ...createAuthSlice(...a),
  ...createAppSlice(...a),
}));
