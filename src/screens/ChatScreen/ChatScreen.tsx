import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {BackButton} from '../../components';
import {useAppStore} from '../../store';
import {useHeader} from '../../hooks/useHeader';
import {HomeStackParamList} from '../../routes/types.navigation';
import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import {LOCAL_HOST} from '../../api';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {ChatEventEnum, chatRoomType, userDataType} from '../../@types';
import {CustomTheme} from '../../theme';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {
  renderBubble,
  renderComposer,
  renderSend,
  renderToolBar,
  renderActions,
  renderAvatar,
  renderChatFooter,
} from '../../components/giftedChatComp';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {markConvRead} from '../../store/chatSlice/chatApiServices';

const ChatScreen = () => {
  /*
   ** Routing params
   */
  const route = useRoute<RouteProp<HomeStackParamList, 'ChatScreen'>>();
  const {room, member, roomImage, roomName} = route.params;
  /*
   * Hooks
   */
  const userData = useAppStore(state => state.userData) as userDataType;
  const socket = useAppStore(state => state.socket);
  const navigation = useAppNavigation();
  const {colors} = useTheme() as CustomTheme;
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [pageNum, setPageNum] = useState(1);
  // // Define state variables and their initial values using 'useState'
  // const [isConnected, setIsConnected] = useState(false);
  const [isTyping] = useState(false);
  /*
   ** Lifecycle methods
   */
  useEffect(() => {
    // Fetch chat room
    const fetchRoom = async () => {
      try {
        setLoading(true);
        // fecthing data
        const response = await LOCAL_HOST.get(`/chat`, {
          params: {
            firstUser: userData?._id,
            secondUser: member?._id,
          },
        });
        console.log('🚀 ~ fetchRoom ~ params:', response);
        if (response.data.data) {
          const roomData = response.data.data as chatRoomType;
          navigation.setParams({room: roomData});
          fetchMessages(roomData?._id);
        }
        setLoading(false);
      } catch (error) {
        console.log('🚀 ~ fetchMessages ~ error:', error);
        setLoading(false);
        Toast.show('Unable to fetch data', Toast.LONG);
      }
    };
    if (room?._id) {
      fetchMessages(room?._id);
    } else {
      fetchRoom();
    }

    // Clean up function
    return () => {
      // Clear chat rooms on unmount
      setMessages([]);
      // marking conv as read
      markConvRead(userData?._id, room?._id);
    };
  }, [userData?._id, room?._id, member?._id, navigation]);

  // This useEffect handles the setting up and tearing down of socket event listeners.
  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;

    // Set up event listeners for various socket events:
    // Listener for when a user is typing.
    socket.on(ChatEventEnum.START_TYPING_EVENT, data => {
      console.log('user is typing....', data);
    });
    // Listener for when a user stops typing.
    socket.on(ChatEventEnum.STOP_TYPING_EVENT, data => {
      console.log('user stop typing...', data);
    });
    // Listener for when a new message is received.
    socket.on(ChatEventEnum.MESSAGE, data => {
      console.log('message received', data);
    });
    // Listener for when a user leaves a chat.
    socket.on(ChatEventEnum.LEAVE_CHAT_EVENT, data => {
      console.log('user leave chat...', data);
    });
    // Listener for when a message is deleted
    socket.on(ChatEventEnum.MESSAGE_DELETE_EVENT, data => {
      console.log('message deleted', data);
    });
    // When the component using this hook unmounts or if `socket` or `chats` change:
    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(ChatEventEnum.START_TYPING_EVENT);
      socket.off(ChatEventEnum.STOP_TYPING_EVENT);
      socket.off(ChatEventEnum.MESSAGE);
      socket.off(ChatEventEnum.LEAVE_CHAT_EVENT);
      socket.off(ChatEventEnum.MESSAGE_DELETE_EVENT);
    };

    // Note:
    // The `chats` array is used in the `onMessageReceived` function.
    // We need the latest state value of `chats`. If we don't pass `chats` in the dependency array,
    // the `onMessageReceived` will consider the initial value of the `chats` array, which is empty.
    // This will not cause infinite renders because the functions in the socket are getting mounted and not executed.
    // So, even if some socket callbacks are updating the `chats` state, it's not
    // updating on each `useEffect` call but on each socket call.
  }, [socket]);
  /*
   ** Fetch chat messages
   */
  const fetchMessages = async (roomId: string) => {
    try {
      setLoading(true);
      // fecthing data
      const response = await LOCAL_HOST.get(`/chat/messages/${roomId}/${userData?._id}`, {
        params: {
          page: 1,
          limit: 20,
        },
      });
      console.log('🚀 ~ fetchMessages ~ response:', response);
      if (response.data.data.items) {
        setMessages(response.data.data.items);
      }
      setLoading(false);
    } catch (error) {
      console.log('🚀 ~ fetchMessages ~ error:', error);
      setLoading(false);
      Toast.show('Unable to fetch data', Toast.LONG);
    }
  };
  /*
   ** On sending message
   */
  const onSend = async (content: IMessage[]) => {
    console.log('🚀 ~ messages:', content);
    try {
      setContentLoading(true);
      if (room) {
        const response = await LOCAL_HOST.post(`/chat/message/${room?._id}`, {
          memberId: content[0].user?._id,
          text: content[0].text,
        });
        console.log('on send', response?.data?.data);
        if (response?.data.data) {
          const newMessage: IMessage = response.data.data;
          console.log('messages', messages);
          console.log('changing arry', newMessage);
          // formating the message
          newMessage.user = {
            _id: userData?._id,
            name: userData?.name,
            avatar: userData?.profileImage,
          };

          setMessages(prevMessages => [newMessage, ...prevMessages]);
        }
      } else {
        const response = await LOCAL_HOST.post(`/chat`, {
          member: member?._id,
          createdBy: userData?._id,
        });
        const roomData = response?.data?.data as chatRoomType;
        if (roomData) {
          fetchMessages(roomData?._id);
        }
        console.log('response:creating chat room', response);
      }
      setContentLoading(false);
    } catch (error) {
      setContentLoading(false);
      console.log('🚀 ~ onSend ~ error:', error);
      Toast.show('Unable to send message', Toast.LONG);
    }
  };
  /*
   ** On loading earlier
   */
  const loadEarlier = async () => {
    try {
      setIsLoadingEarlier(true);
      // fecthing  old messages
      const response = await LOCAL_HOST.get(`/chat/messages/${room?._id}/${userData?._id}`, {
        params: {
          page: pageNum + 1,
          limit: 20,
        },
      });
      console.log('🚀 ~ fetchMessages ~ response:', response);
      const chatMessages = response.data.data.items as never[];
      const page = response.data.data.page as number;
      if (chatMessages && chatMessages.length > 0 && page > 1) {
        // appending the messages
        setMessages([...messages, ...(chatMessages as never)]);
        setPageNum(pageNum + 1);
      }
      setIsLoadingEarlier(false);
    } catch (error) {
      setIsLoadingEarlier(false);
      console.log('🚀 ~ loadEarlier ~ error:', error);
      Toast.show('Unable to load previous message', Toast.LONG);
    }
  };

  /*
   ** Rendeing header componenet
   */
  useHeader(
    {
      titleMode: 'avatar',
      title: roomName || 'Loci user',
      LeftActionComponent: <BackButton />,
      avatarUrl: roomImage,
    },
    [],
  );
  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.header}]}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: userData?._id?.toLowerCase(),
          name: `${userData?.nickName}`,
          avatar: userData?.profileImage,
        }}
        loadEarlier={true}
        isLoadingEarlier={isLoadingEarlier}
        alwaysShowSend={true}
        onLoadEarlier={loadEarlier}
        scrollToBottom={true}
        isTyping={isTyping}
        inverted={true}
        alignTop={true}
        renderInputToolbar={renderToolBar}
        renderActions={renderActions}
        listViewProps={{showsVerticalScrollIndicator: false}}
        renderUsernameOnMessage={true}
        renderChatFooter={() => renderChatFooter(loading, colors.primary)}
        renderAvatar={renderAvatar}
        renderSend={props => renderSend(props, contentLoading)}
        renderComposer={renderComposer}
        renderBubble={renderBubble}
      />
    </View>
  );
};

export default ChatScreen;
