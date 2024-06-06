import {create} from 'zustand';
import {createAuthSlice} from './slices/authSlice/authSlice';
import {createAppSlice} from './slices/appSlice/appSlice';
import {createUserSlice} from './slices/userSlice/userSlice';
import {authSlice} from './slices/authSlice/type';
import {appSlice} from './slices/appSlice/type';
import {userSlice} from './slices/userSlice/type';

export const useAppStore = create<authSlice & appSlice & userSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createAuthSlice(...a),
  ...createAppSlice(...a),
}));
