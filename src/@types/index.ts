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
/**
 * @description set of events that we are using in chat app. more to be added as we develop the chat app
 */
export const ChatEventEnum = Object.freeze({
  // ? once user is ready to go
  CONNECTION_EVENT: 'connection',
  // ? once user is ready to go
  CONNECTED_EVENT: 'connected',
  // ? when user gets disconnected
  DISCONNECT_EVENT: 'disconnect',
  // ? when user joins a socket room
  JOIN_CHAT_EVENT: 'joinChat',
  // ? when participant gets removed from group, chat gets deleted or leaves a group
  LEAVE_CHAT_EVENT: 'leaveChat',
  // ? when admin updates a group name
  UPDATE_GROUP_NAME_EVENT: 'updateGroupName',
  // ? when new message is received
  MESSAGE: 'message',
  // ? when there is new one on one chat, new group chat or user gets added in the group
  NEW_CHAT_EVENT: 'newChat',
  // ? when there is an error in socket
  SOCKET_ERROR_EVENT: 'socketError',
  // ? when participant stops typing
  STOP_TYPING_EVENT: 'stopTyping',
  // ? when participant starts typing
  START_TYPING_EVENT: 'startTyping',
  // ? when message is deleted
  MESSAGE_DELETE_EVENT: 'messageDeleted',
  // ? whensending server message to user
  SERVER_MESSAGE: 'serverMessage',
});
