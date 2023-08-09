interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// Login User
export interface loginParamType {
  email: string;
  password: string;
}

export interface UsersState {
  userData: Object;
  isError: Boolean;
  isLoading: Boolean;
  isSuccess: Boolean;
  message: String | any;
  tokens: Tokens;
}

export interface changePasswordParamsType {
  code: number;
  email: string;
  accessToken: string;
}
export interface forgotChangePasswordParamsType {
  code: number;
  newPassword: string;
  accessToken: string;
}
