export type userType = {
  readonly PK: string;
  readonly SK: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  companyName: string;
  position: string;
  hasProfileSetUp: Boolean;
  email: string;
  profileDetail: string;
  verificationStatus: 'NOT-VERIFIED' | 'VERIFIED' | 'PENDING';
  profileImage: string;
  isAdmin?: boolean;
  createdAt: string;
  accountStatus: 'NOT-CONFIRMED' | 'DISABLE' | 'ACTIVE';
  userStatus: 'PARTICIPANT' | 'SPEAKER';
  tier: number;
};
export interface updateUserDataType {
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  companyName: string;
  position: string;
  profileDetail: string;
  tier: number;
  hasProfileSetUp: boolean;
}
export interface userDataWithTokenType {
  data: userType;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface ChangePasswordType {
  newPassword: string;
  oldPassword: string;
  accessToken: string;
  userId: string;
}

export interface UsersStateType {
  userData: {};
  isError: Boolean;
  isLoading: Boolean;
  isSuccess: Boolean;
  message: String | any;
}
