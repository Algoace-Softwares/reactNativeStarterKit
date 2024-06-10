import {create} from 'zustand';
import {createAuthSlice} from './slices/authSlice';
import {createUserSlice} from './slices/userSlice';
import {appSlice, authSlice, userSlice} from './slices/type';
import {createAppSlice} from './slices/appSlice';
/*
 ** set object to us to contain each slice reset function
 */
export const sliceResetFns = new Set<() => void>();
/*
 ** Resetting each slice state
 */
export const resetAllSlices = () => {
  sliceResetFns.forEach(resetFn => {
    resetFn();
  });
};
/*
 ** Main zustand store
 */
export const useAppStore = create<authSlice & appSlice & userSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createAuthSlice(...a),
  ...createAppSlice(...a),
}));
