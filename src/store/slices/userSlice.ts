import {StateCreator} from 'zustand';
import {userSlice, userState} from './type';

/*
 ** Initial states
 */
const initialState: userState = {
  userError: false,
  userLoading: false,
  userSuccess: false,
  userMessage: '',
  bears: 0,
};

export const createUserSlice: StateCreator<userSlice> = set => ({
  ...initialState,
  addBear: () => set(state => ({bears: state.bears + 1})),
});
