import React, {useEffect, useRef, useState} from 'react';
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
} from '../../components/giftedChatComp';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {markConvRead} from '../../store/chatSlice/chatApiServices';

const ChatScreen = () => {
  /*
   ** Routing params
   ** Extract chat room and member details from route parameters
   */
  const route = useRoute<RouteProp<HomeStackParamList, 'ChatScreen'>>();
  const {room, member, roomImage, roomName} = route.params;

  /*
   * Hooks
   ** Access application state, navigation, and theme
   */
  const userData = useAppStore(state => state.userData) as userDataType;
  const socket = useAppStore(state => state.socket);
  const navigation = useAppNavigation();
  const {colors} = useTheme() as CustomTheme;

  /*
   ** States
   ** Manage local state for loading indicators, messages, and pagination
   */
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [pageNum, setPageNum] = useState(1);
  // To track if someone is currently typing
  const [isTyping, setIsTyping] = useState(false);
  // To keep track of the setTimeout function
  const typingTimeoutRef = useRef<number | null>(null);
  // To track if the current user is typing
  const [selfTyping, setSelfTyping] = useState(false);

  /*
   ** Lifecycle methods
   ** Fetch chat room and messages on mount; clean up on unmount
   */
  useEffect(() => {
    // Function to fetch chat room details
    const fetchRoom = async () => {
      try {
        setIsLoadingEarlier(true);
        // api call
        const response = await LOCAL_HOST.get(`/chat`, {
          params: {
            firstUser: userData?._id,
            secondUser: member?._id,
          },
        });
        console.log('🚀 ~ fetchRoom ~ params:', response);
        if (response.data.data) {
          const roomData = response.data.data as chatRoomType;
          // setting navigation params
          navigation.setParams({room: roomData});
          // now fetching messages of that room
          fetchMessages(roomData?._id, 1);
        }
        setIsLoadingEarlier(false);
      } catch (error) {
        console.log('🚀 ~ fetchMessages ~ error:', error);
        setIsLoadingEarlier(false);
        Toast.show('Unable to fetch data', Toast.LONG);
      }
    };

    // Fetch messages if room ID is available; otherwise, fetch room details
    if (room?._id) {
      fetchMessages(room?._id, 1);
    } else {
      fetchRoom();
    }

    // Clean up function: reset messages and mark conversation as read
    return () => {
      setMessages([]);
      markConvRead(userData?._id, room?._id);
    };
  }, [userData?._id, room?._id, member?._id, navigation]);

  /*
   ** Socket Event Listeners
   ** Set up and tear down event listeners for socket events
   */
  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;
    /**
     * Handles the "typing" event on the socket.
     */
    const handleSocketTyping = (chatId: string, typingValue: boolean) => {
      console.log('User is start/stop typing...', chatId, typingValue);
      // Check if the stop typing event is for the currently active chat.
      if (chatId !== room?._id) return;
      // Set the typing state to false for the current chat.
      setIsTyping(typingValue);
    };

    // Listener for when a user is typing.
    socket.on(ChatEventEnum.START_TYPING_EVENT, (chatId: string) => handleSocketTyping(chatId, true));
    // Listener for when a user stops typing.
    socket.on(ChatEventEnum.STOP_TYPING_EVENT, (chatId: string) => handleSocketTyping(chatId, false));
    // Listener for when a new message is received.
    socket.on(ChatEventEnum.MESSAGE, (newMessage: IMessage & {chatRoom: string}) => {
      if (newMessage?.chatRoom === room?._id) {
        setMessages(prevMessages => [newMessage, ...prevMessages]);
      }
    });
    // Listener for when a user leaves a chat.
    socket.on(ChatEventEnum.LEAVE_CHAT_EVENT, data => {
      console.log('User left chat...', data);
    });
    // Listener for when a message is deleted
    socket.on(ChatEventEnum.MESSAGE_DELETE_EVENT, data => {
      console.log('Message deleted', data);
    });

    // Clean up socket event listeners on component unmount or when socket changes
    return () => {
      socket.off(ChatEventEnum.START_TYPING_EVENT);
      socket.off(ChatEventEnum.STOP_TYPING_EVENT);
      socket.off(ChatEventEnum.MESSAGE);
      socket.off(ChatEventEnum.LEAVE_CHAT_EVENT);
      socket.off(ChatEventEnum.MESSAGE_DELETE_EVENT);
    };
  }, [socket, room]);

  /*
   ** Fetch Messages
   ** Retrieve chat messages for a specific room
   */
  const fetchMessages = async (roomId: string, page: number) => {
    try {
      setIsLoadingEarlier(true);
      // Make an async request to fetch chat messages for the current chat
      const response = await LOCAL_HOST.get(`/chat/messages/${roomId}/${userData?._id}`, {
        params: {
          page,
          limit: 20,
        },
      });
      console.log('🚀 ~ fetchMessages ~ response:', response);
      // refactoring data
      const chatMessages = response.data.data.items as IMessage[];
      const currentPage = response.data.data.page as number;
      // if page is 1 then is first time api calling save data same on state varaiable
      if (chatMessages && chatMessages?.length >= 1 && page === 1) {
        setMessages(chatMessages);
      } else if (chatMessages && chatMessages?.length >= 1 && currentPage > 1) {
        setMessages([...messages, ...chatMessages]);
        setPageNum(currentPage);
      }
      setIsLoadingEarlier(false);
    } catch (error) {
      console.log('🚀 ~ fetchMessages ~ error:', error);
      setIsLoadingEarlier(false);
      // showing toast
      Toast.show('Unable to fetch data', Toast.LONG);
    }
  };

  /*
   ** Send Message
   ** Handle sending a new chat message
   */
  const onSend = async (content: IMessage[]) => {
    console.log('🚀 ~ messages:', content);
    try {
      setContentLoading(true);
      // checking if there is a room then send message if not then create room first then send message
      if (room) {
        // Emit a STOP_TYPING_EVENT to inform other users/participants that typing has stopped

        socket && socket.emit(ChatEventEnum.STOP_TYPING_EVENT, room?._id);
        // making an apii call for sendinig chat message
        const response = await LOCAL_HOST.post(`/chat/message/${room?._id}`, {
          memberId: content[0].user?._id,
          text: content[0].text,
        });
        console.log('On send', response?.data?.data);
        if (response?.data.data) {
          // saving the messsage to statte variable
          const newMessage: IMessage = response.data.data;
          setMessages(prevMessages => [newMessage, ...prevMessages]);
        }
      } else {
        // making and api call to create room
        const response = await LOCAL_HOST.post(`/chat`, {
          member: member?._id,
          createdBy: userData?._id,
        });
        const roomData = response?.data?.data as chatRoomType;
        if (roomData) {
          fetchMessages(roomData?._id, 1);
        }
        console.log('Response: Creating chat room', response);
      }
      setContentLoading(false);
    } catch (error) {
      setContentLoading(false);
      console.log('🚀 ~ onSend ~ error:', error);
      // showing toast
      Toast.show('Unable to send message', Toast.LONG);
    }
  };
  /*
   ** Handling text input for typing indicator
   */
  const handleOnMessageChange = (text: string) => {
    console.log('🚀 ~ handleOnMessageChange ~ text:', text);
    // If socket doesn't exist or isn't connected, exit the function
    if (!socket) return;

    // Check if the user isn't already set as typing
    if (!selfTyping) {
      // Set the user as typing
      setSelfTyping(true);

      // Emit a typing event to the server for the current chat
      socket.emit(ChatEventEnum.START_TYPING_EVENT, room?._id);
    }
    // Clear the previous timeout (if exists) to avoid multiple setTimeouts from running
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    // Set a timeout to stop the typing indication after the timerLength has passed the time lenght is 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      // Emit a stop typing event to the server for the current chat
      socket.emit(ChatEventEnum.START_TYPING_EVENT, room?._id);
      // Reset the user's typing state
      setSelfTyping(false);
    }, 2000);
  };

  /*
   ** Header Component
   ** Configure and render header with title, back button, and avatar
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
        onLoadEarlier={() => room?._id && fetchMessages(room?._id, pageNum + 1)}
        scrollToBottom={true}
        isTyping={isTyping}
        inverted={true}
        alignTop={true}
        renderInputToolbar={renderToolBar}
        renderActions={renderActions}
        listViewProps={{showsVerticalScrollIndicator: false}}
        renderUsernameOnMessage={true}
        renderAvatar={renderAvatar}
        renderSend={props => renderSend(props, contentLoading)}
        onInputTextChanged={handleOnMessageChange}
        renderComposer={renderComposer}
        renderBubble={renderBubble}
      />
    </View>
  );
};

export default ChatScreen;
