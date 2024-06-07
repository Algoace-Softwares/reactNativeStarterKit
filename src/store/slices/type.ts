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
export interface authState {
  userData: object | undefined;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string | any;
  fishes: number;
  tokens: tokenType;
}
/*
 ** Auth slice type
 */
export interface authSlice extends authState {
  signIn: (p: emailPassType) => void;

  signUp: (p: SignUpParams) => void;

  forgotPassword: (email: string) => void;

  forgotChangePassword: (email: string, password: string, code: string) => void;

  confirmSignup: (email: string, code: string) => void;

  changePassword: (userId: string, oldPassword: string, newPassword: string, accessToken: string) => void;

  resetToken: () => void;

  resendCode: (email: string) => void;

  signOut: (userId: string, accessToken: string) => void;

  deleteUser: (userId: string) => void;
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

export interface userSlice {
  bears: number;
  addBear: () => void;
}
