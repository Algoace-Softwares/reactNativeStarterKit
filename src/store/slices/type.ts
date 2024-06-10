import {userDataType} from '../../@types';

/*
 ** AppSlicesTypes
 */
export interface appStateType {
  theme: string;
  language: string;
}

export interface appSlice extends appStateType {
  setTheme: (newTheme: string) => void;
  setLanguage: (language: string) => void;
}

export interface tokenType {
  accessToken: string;
  refreshToken: string;
}
/*
 ** Auth slice type
 */
export interface authState {
  userData: userDataType | undefined;
  authError: boolean;
  authLoading: boolean;
  authSuccess: boolean;
  authMessage: string;
  fishes: number;
  tokens: tokenType;
}
export interface authSlice extends authState {
  signIn: (p: emailPassType) => void;

  signUp: (p: SignUpParams) => Promise<void>;

  forgotPassword: (email: string) => Promise<void>;

  forgotChangePassword: (emailAddress: string, password: string, code: string) => Promise<void>;

  confirmSignup: (email: string, code: string, password: string) => void;

  updateToken: (tokens: tokenType) => void;
  updateUserData: (user: userDataType) => void;
  resendCode: (emailAddress: string) => void;
  signOut: () => void;
  deleteUser: (userId: string) => void;
  fetchUserDataLocal: () => Promise<void>;
}

export interface emailPassType {
  email: string;
  password: string;
}

export interface SignUpParams {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  state?: string;
  city?: string;
}
/*
 ** User slice type
 */

export interface userState {
  userError: boolean;
  userLoading: boolean;
  userSuccess: boolean;
  userMessage: string;
  bears: number;
}
export interface userSlice extends userState {
  addBear: () => void;
}
