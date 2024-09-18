import {Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppScreen, AppText, BackButton, FloatingButton, Loading, MessengerCard} from '../../components';
import {useAppStore} from '../../store';
import {useHeader} from '../../hooks/useHeader';
import {COLORS} from '../../theme';
import styles from './style';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ChatEventEnum, chatRoomType, userDataType} from '../../@types';
import Toast from 'react-native-simple-toast';
import {LOCAL_HOST} from '../../api';
import {appUtils} from '../../utils';
import {getChatRooms, markConvRead} from '../../store/chatSlice/chatApiServices';
// TODO: logic for when recieve a message update the chat room and bring it to the top
const ChatRoomsScreen = () => {
  /*
   * Hooks
   */
  const chatRooms = useAppStore(state => state.chatRooms);
  const userData = useAppStore(state => state.userData) as userDataType;
  console.log('🚀 ~ ChatRoomsScreen ~ userData:', userData);
  const setChatRooms = useAppStore(state => state.setChatRooms);
  const socket = useAppStore(state => state.socket);
  const navigation = useAppNavigation();
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  /*
   ** Lifecycle methods
   */
  useEffect(() => {
    // Fetch chat rooms
    const fetchChatRooms = async () => {
      try {
        setLoading(true);
        await getChatRooms(userData?._id as string, 1);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('🚀 ~ fetchChatRooms ~ error:', error);
      }
    };
    fetchChatRooms();

    // Clean up function
    return () => {
      // Clear chat rooms on unmount
      setChatRooms([]);
    };
  }, [setChatRooms, userData?._id]);
  // This useEffect handles the setting up and tearing down of socket event listeners.
  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;

    // Set up event listeners for various socket events:

    // Listener for the initiation of a new chat.
    socket.on(ChatEventEnum.NEW_CHAT_EVENT, data => {
      console.log('new chat', data);
    });
    // Listener for when a group's name is updated.
    socket.on(ChatEventEnum.UPDATE_GROUP_NAME_EVENT, data => {
      console.log('group name changes', data);
    });
    // Listener for when a new message is received.
    socket.on(ChatEventEnum.MESSAGE, data => {
      console.log('message received : chatroom', data);
    });
    // When the component using this hook unmounts or if `socket` or `chats` change:
    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(ChatEventEnum.NEW_CHAT_EVENT);
      socket.off(ChatEventEnum.UPDATE_GROUP_NAME_EVENT);
      socket.off(ChatEventEnum.MESSAGE);
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
   ** Deleting chat room
   */
  const deleteChatRooms = async (roomId: string) => {
    console.log('🚀 ~ deleteChatRooms ~ roomId:', roomId);
    try {
      setLoading(true);
      const response = await LOCAL_HOST.delete(`/chat/${roomId}/${userData?._id}`);
      console.log('response: deletechatRoom:', response);
      // Remove the chat room from the state using its ID
      setChatRooms(chatRooms.filter(chatRoom => chatRoom._id !== roomId));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('🚀 ~ deleteChatRooms ~ error:', error);
      Toast.show('Unable to delete chat room', Toast.LONG);
    }
  };
  /*
   ** report chat room
   */
  const reportChatRoom = async (room: chatRoomType) => {
    try {
      const subject = 'Report conversation';
      const reportedUser = room?.members?.filter(member => userData?._id !== member?._id);
      // message body
      const body =
        'I would like to report conversation with id = ' +
        room?._id +
        ' against this user' +
        reportedUser[0]?.email +
        ' ' +
        reportedUser[0]?._id;
      // reciever address
      const reciever = 'info@loci.live';
      await appUtils.sendEmail(subject, body, reciever);
    } catch (error) {
      console.log('🚀 ~ deleteChatRooms ~ error:', error);
      Toast.show('Unable to send email. Invalid email configuration', Toast.LONG);
    }
  };
  /*
   ** Rendeering item list
   */
  const renderItem = (chatItem: chatRoomType) => {
    // feltering the data when room is not chat room so the profileimage and room name would be another user name and its profile
    if (!chatItem.isGroupChat) {
      // filtering the data
      const secondMember = chatItem.members.filter(member => member._id !== userData?._id);
      // injecting second member data as profileImage and roomName
      if (secondMember && secondMember.length > 0) {
        chatItem.roomName = secondMember[0].name;
        chatItem.profileImage = secondMember[0].profileImage;
      }
    }
    // redering message card
    return (
      <MessengerCard
        item={chatItem}
        onLongPress={() => {
          Alert.alert('Chat Rooms actions', '', [
            {
              text: 'Delete chat room',
              onPress: () => deleteChatRooms(chatItem?._id),
            },
            {
              text: 'Report chat room',
              onPress: () => reportChatRoom(chatItem),
            },
            {text: 'Mark as read', onPress: () => markConvRead(userData?._id, chatItem?._id)},
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]);
        }}
      />
    );
  };
  /*
   ** Rendeing header componenet
   */
  useHeader(
    {
      titleMode: 'center',
      transTitle: 'chatRoomsScreen',
      LeftActionComponent: <BackButton />,
    },
    [],
  );

  return (
    <AppScreen>
      <FlatList
        data={chatRooms}
        keyExtractor={(_, index) => `index-${index}`}
        ListEmptyComponent={loading ? null : <AppText transText={'noRoomFound'} style={styles.notFoundLableStyling} />}
        ListHeaderComponent={loading ? <Loading fullScreen /> : <></>}
        style={styles.flatListContStyle}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderItem(item)}
      />
      <FloatingButton
        fillColor={COLORS.buttonTextSeconday}
        onPressBtn={() => navigation.navigate('UserSearchScreen')}
      />
    </AppScreen>
  );
};

export default ChatRoomsScreen;
