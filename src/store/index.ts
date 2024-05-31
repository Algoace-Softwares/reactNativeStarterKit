import {create} from 'zustand';
import {createBearSlice} from './slices/userSlice';
import {createFishSlice} from './slices/authSlice';
import {BearSlice, FishSlice} from './slices/type';

export const useBoundStore = create<BearSlice & FishSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}));
