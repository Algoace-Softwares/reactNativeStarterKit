import React, {useEffect, useState} from 'react';
import {BackButton} from '../../components';
import {useAppStore} from '../../store';
import {useHeader} from '../../hooks/useHeader';
import {HomeStackParamList} from '../../routes/types.navigation';
import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import {LOCAL_HOST} from '../../api';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {View} from 'react-native';
import {userDataType} from '../../@types';
import {CustomTheme} from '../../theme';
import {GiftedChat} from 'react-native-gifted-chat';
import {renderBubble, renderComposer, renderSend, renderToolBar, renderActions} from '../../components/giftedChatComp';
import {IMessage} from './types';
import {useAppNavigation} from '../../hooks/useAppNavigation';

const ChatScreen = () => {
  /*
   ** Routing params
   */
  const route = useRoute<RouteProp<HomeStackParamList, 'ChatScreen'>>();
  const {room, member, roomImage, roomName} = route.params;
  console.log('🚀 ~ ChatScreen ~ params:', route.params);
  /*
   * Hooks
   */
  const userData = useAppStore(state => state.userData) as userDataType;
  const navigation = useAppNavigation();
  const {colors} = useTheme() as CustomTheme;
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);
  const [messages, setMessages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  /*
   ** Lifecycle methods
   */
  useEffect(() => {
    // Fetch chat messages
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // fecthing data
        const response = await LOCAL_HOST.get(`/chat/messages/${room?._id}/${userData?._id}`, {
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
          // room = response.data.data;
          navigation.setParams({room: response.data.data});
          fetchMessages();
        }
        setLoading(false);
      } catch (error) {
        console.log('🚀 ~ fetchMessages ~ error:', error);
        setLoading(false);
        Toast.show('Unable to fetch data', Toast.LONG);
      }
    };
    if (room?._id) {
      fetchMessages();
    } else {
      fetchRoom();
    }

    // Clean up function
    return () => {
      // Clear chat rooms on unmount
      setMessages([]);
    };
  }, [userData?._id, room?._id, member?._id, navigation]);
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
        console.log('on send', response);
      } else {
        const response = await LOCAL_HOST.post(`/chat`, {
          member: member?._id,
          createdBy: userData?._id,
          text: content[0].text,
        });
        console.log('on send', response);
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
        infiniteScroll={true}
        inverted={false}
        alignTop={true}
        renderInputToolbar={renderToolBar}
        renderActions={renderActions}
        // renderMessageImage={renderMessageContainer}
        renderAvatar={null}
        renderSend={props => renderSend(props, contentLoading)}
        renderComposer={renderComposer}
        // renderMessage={renderMessage}
        // renderMessageText={renderMessageText}
        // isCustomViewBottom
        renderBubble={renderBubble}
        listViewProps={{
          showsVerticalScrollIndicator: false,
          style: {
            // marginBottom: insets.bottom / 4 + 10,
            // paddingTop: 200,
            flex: 1,
          },
        }}
      />
    </View>
  );
};

export default ChatScreen;
