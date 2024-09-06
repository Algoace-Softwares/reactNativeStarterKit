import {userDataType} from '../../@types';

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: userDataType;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}
interface Reply {
  title: string;
  value: string;
  messageId?: number | string;
}

interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: Reply[];
  keepIt?: boolean;
}
