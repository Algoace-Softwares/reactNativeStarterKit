import {StateCreator} from 'zustand';
import {BearSlice} from './type';

export const createBearSlice: StateCreator<BearSlice> = set => ({
  bears: 0,
  addBear: () => set(state => ({bears: state.bears + 1})),
});
