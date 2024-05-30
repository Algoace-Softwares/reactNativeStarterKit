import {StateCreator} from 'zustand';
import {FishSlice, UsersState} from './type';
/*
 ** Initial states
 */
const initialState: UsersState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  userData: undefined,
  fishes: 0,
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
};
export const createFishSlice: StateCreator<FishSlice> = set => ({
  ...initialState,
  addFish: () => set(state => ({fishes: state.fishes + 1})),
  resetToken: () => set(_ => ({tokens: {accessToken: '', refreshToken: ''}})),
});
