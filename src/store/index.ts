import {create} from 'zustand';
import {createAuthSlice} from './slices/authSlice';
import {createUserSlice} from './slices/userSlice';
import {appSlice, authSlice, userSlice} from './slices/type';
import {createAppSlice} from './slices/appSlice';

const sliceResetFns = new Set<() => void>();

export const resetAllSlices = () => {
  sliceResetFns.forEach(resetFn => {
    resetFn();
  });
};

export const useAppStore = create<authSlice & appSlice & userSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createAuthSlice(...a),
  ...createAppSlice(...a),
}));
