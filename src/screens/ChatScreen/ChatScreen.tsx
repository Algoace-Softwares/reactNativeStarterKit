import React, {useCallback, useEffect, useState} from 'react';
import {AppScreen, BackButton} from '../../components';
import {useAppStore} from '../../store';
import {useHeader} from '../../hooks/useHeader';
import {GiftedChat} from 'react-native-gifted-chat';
import {HomeStackParamList} from '../../routes/types.navigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AUTH_API} from '../../api';
import Toast from 'react-native-simple-toast';

const ChatScreen = () => {
  /*
   ** Routing params
   */
  const route = useRoute<RouteProp<HomeStackParamList, 'ChatScreen'>>();
  const {room, member, roomImage, roomName} = route.params;
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
  useEffect(() => {
    // Fetch chat messages
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // fecthing data
        const response = await AUTH_API.get('/chat/messages', {
          params: {
            roomId: room?._id,
            userId: userData?._id,
            page: 1,
            limit: 20,
          },
        });
        if (response.data.data.items) {
          setMessages(response.data.data.items);
        }
        setLoading(false);
      } catch (error) {
        console.log('🚀 ~ fetchMessages ~ error:', error);
        setLoading(false);
        Toast.show('Unable to fetch messages', Toast.LONG);
      }
    };
    fetchMessages();

    // Clean up function
    return () => {
      // Clear chat rooms on unmount
      setMessages([]);
    };
  }, [userData?._id, room?._id]);
  /*
   ** On sending message
   */
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }, []);
  /*
   ** Rendeing header componenet
   */
  useHeader(
    {
      titleMode: 'center',
      title: roomName || 'Loci user',
      LeftActionComponent: <BackButton />,
    },
    [],
  );

  return (
    <AppScreen>
      <GiftedChat
        messages={messages}
        onSend={data => onSend(data)}
        user={{
          _id: 1,
        }}
      />
    </AppScreen>
  );
};

export default ChatScreen;
