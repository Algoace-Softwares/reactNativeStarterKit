import {create} from 'zustand';
import {createBearSlice} from './slices/userSlice';
import {createFishSlice} from './slices/authSlice';
import {appSlice, BearSlice, FishSlice} from './slices/type';
import {createAppSlice} from './slices/appSlice';

export const useBoundStore = create<BearSlice & FishSlice & appSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
  ...createAppSlice(...a),
}));
