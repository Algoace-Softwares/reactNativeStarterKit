export interface tokenType {
  accessToken: string;
  refreshToken: string;
}
export interface UsersState {
  userData: object | undefined;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string | any;
  fishes: number;
  tokens: tokenType | undefined;
}

export interface appStateType {
  theme: string;
  language: string;
}

export interface BearSlice {
  bears: number;
  addBear: () => void;
}
export interface appSlice extends appStateType {
  setTheme: () => void;
  setLanguage: () => void;
}

export interface FishSlice extends UsersState {
  addFish: () => void;
  resetToken: () => void;
}
