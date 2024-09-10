export interface userDataType {
  readonly _id: string;
  readonly cognitoId: string;
  readonly email: string;
  name: string;
  nickName: string;
  privacyStatus: 'PUBLIC' | 'PRIVATE';
  gender: 'MALE' | 'FEMALE';
  dateOfBirth?: string;
  profileImage: string;
  notification: boolean;
  socialTokens: socialType[];
  fcmTokens: FcmTokenType[];
  postCount: number;
  followerCount: number;
  followingCount: number;
  reportCount: number;
  warningCount: number;
  profileDescription: string;
  accountStatus: 'NOT-ACTIVE' | 'ACTIVE' | 'DISABLED' | 'DELETED';
  createdAt?: Date;
  updatedAt?: Date;
  blockedUsers: string[];
}
export interface tokenType {
  accessToken: string;
  refreshToken: string;
}
export interface socialType {
  socialId: string;
  socialPlatform: string;
}
export interface FcmTokenType {
  deviceId: string;
  fcmToken: string;
}
export type chatRoomMember = {
  _id: string;
  email: string;
  name: string;
  nickName: string;
  profileImage: string;
};
export type messageType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'VOICE' | 'FILE';
export type lastMessageType = {
  text: string;
  messageType: messageType;
};

export interface chatRoomType {
  readonly _id: string;
  readonly createdBy: string;
  admins: string[];
  members: chatRoomMember[];
  isGroupChat: boolean;
  lastMessage?: lastMessageType;
  roomName: string;
  roomPrivacy: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface chatMessageType {
  readonly _id?: string;
  readonly chatRoom: string;
  sender: string;
  messageType: messageType;
  media?: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  isEdited: boolean;
  reactions: string[];
  isSeen: boolean;
  isDelivered: boolean;
}
