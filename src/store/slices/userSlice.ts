import {StateCreator} from 'zustand';
import {userSlice} from './type';

export const createUserSlice: StateCreator<userSlice> = set => ({
  bears: 0,
  addBear: () => set(state => ({bears: state.bears + 1})),
});
