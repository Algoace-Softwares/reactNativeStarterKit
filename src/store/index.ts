import {create} from 'zustand';
import {createBearSlice} from './slice/userSlice';
import {createFishSlice} from './slice/authSlice';
import {BearSlice, FishSlice} from './slice/type';

export const useBoundStore = create<BearSlice & FishSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}));
