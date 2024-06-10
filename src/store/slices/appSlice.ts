import {StateCreator} from 'zustand';
import {appSlice, appStateType} from './type';
import {sliceResetFns} from '..';
/*
 ** Initial states
 */
const initialState: appStateType = {
  theme: '',
  language: '',
};

export const createAppSlice: StateCreator<appSlice> = set => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,

    setTheme: newTheme => set({theme: newTheme}),
    setLanguage: language => set({language}),
  };
};
