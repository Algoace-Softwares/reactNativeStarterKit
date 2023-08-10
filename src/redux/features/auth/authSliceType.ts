export interface tokenType {
  accessToken: string;
  refreshToken: string;
}

// Login User
export interface loginParamType {
  email: string;
  password: string;
}

export interface UsersState {
  userData: object | null;
  isError: Boolean;
  isLoading: Boolean;
  isSuccess: Boolean;
  message: String | any;
  tokens: tokenType;
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

export interface userType {
  readonly PK: string;
  readonly SK: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  companyName: string;
  position: string;
  email: string;
  verificationStatus: 'NOT-VERIFIED' | 'VERIFIED' | 'PENDING';
  isAdmin?: boolean;
  createdAt: string;
}
