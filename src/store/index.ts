import {create} from 'zustand';
import {createAuthSlice} from './slices/authSlice';
import {createUserSlice} from './slices/userSlice';
import {appSlice, authSlice, userSlice} from './slices/type';
import {createAppSlice} from './slices/appSlice';

/*
 ** Main zustand store
 */
export const useAppStore = create<authSlice & appSlice & userSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createAuthSlice(...a),
  ...createAppSlice(...a),
}));
