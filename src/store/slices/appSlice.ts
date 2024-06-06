import {StateCreator} from 'zustand';
import {appStateType} from './type';
/*
 ** Initial states
 */
const initialState: appStateType = {
  theme: '',
  language: '',
};
export const createAppSlice: StateCreator<appSlice> = set => ({
  name: 'appSlice',
  ...initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});
