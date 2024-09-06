import React, {useCallback, useState} from 'react';
import {AppScreen, BackButton} from '../../components';
import {useAppStore} from '../../store';
import {useHeader} from '../../hooks/useHeader';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatScreen = () => {
  /*
   * Hooks
   */
  const userData = useAppStore(state => state.userData);
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState([]);
  /*
   ** Lifecycle methods
   */
  // useEffect(() => {
  //   // Fetch chat rooms
  //   const fetchChatRooms = async () => {
  //     try {
  //       setLoading(true);
  //       await getChatRooms(userData?._id as string);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log('🚀 ~ fetchChatRooms ~ error:', error);
  //     }
  //   };
  //   fetchChatRooms();

  //   // Clean up function
  //   return () => {
  //     // Clear chat rooms on unmount
  //     setChatRooms([]);
  //   };
  // }, [setChatRooms, userData?._id]);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }, []);
  /*
   ** Rendeing header componenet
   */
  useHeader(
    {
      titleMode: 'center',
      transTitle: 'chatScreen',
      LeftActionComponent: <BackButton />,
    },
    [],
  );

  return (
    <AppScreen>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </AppScreen>
  );
};

export default ChatScreen;
