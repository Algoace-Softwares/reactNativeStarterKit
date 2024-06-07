import {StateCreator} from 'zustand';
import {appSlice, appStateType} from './type';
/*
 ** Initial states
 */
const initialState: appStateType = {
  theme: '',
  language: '',
};

export const createAppSlice: StateCreator<appSlice> = set => ({
  ...initialState,

  setTheme: newTheme => set({theme: newTheme}),
  setLanguage: language => set({language}),
});
