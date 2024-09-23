import {Alert, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppScreen, AppText, BackButton, FloatingButton, Loading, MessengerCard} from '../../components';
import {useAppStore} from '../../store';
import {useHeader} from '../../hooks/useHeader';
import {COLORS} from '../../theme';
import styles from './style';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ChatEventEnum, chatMessageType, chatRoomType, userDataType} from '../../@types';
import Toast from 'react-native-simple-toast';
import {LOCAL_HOST} from '../../api';
import {appUtils} from '../../utils';
import {markConvRead} from '../../store/chatSlice/chatApiServices';
// TODO: logic for when recieve a message update the chat room and bring it to the top
const ChatRoomsScreen = () => {
  /*
   * Hooks
   */
  const chatRooms = useAppStore(state => state.chatRooms);
  const userData = useAppStore(state => state.userData) as userDataType;
  const setChatRooms = useAppStore(state => state.setChatRooms);
  const updateChatRooms = useAppStore(state => state.updateChatRooms);
  const socket = useAppStore(state => state.socket);
  const navigation = useAppNavigation();
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  /*
   ** Functions
   */
  /*
   ** Fetch chat rooms
   */
  const fetchChatRooms = async (page: number = 1) => {
    try {
      setLoading(true);
      // api call
      const chatRoomsData = await LOCAL_HOST.get(`/chat/${userData?._id}`, {
        params: {
          page,
          limit: 20,
        },
      });
      // Handle success
      console.log('🚀 ~ getChatRooms ~ chatRoomsData:', chatRoomsData);
      const rooms = chatRoomsData?.data?.data?.items;
      const currentPage = chatRoomsData.data.data.page as number;
      const totalPages = chatRoomsData.data.data.totalPages as number;
      // if rooms and page value is 1 meaning first page then save directly
      if (rooms && currentPage === 1) {
        setChatRooms(rooms);
      } else if (rooms && rooms?.length >= 1 && currentPage > 1) {
        updateChatRooms(rooms, 'CONCAT_CHAT');
      }
      // saving pages and  toal pages very time when api has been called
      setPageNum(currentPage);
      setTotalPage(totalPages);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log('🚀 ~ getChatRooms ~ error:', error);
      // showing toast
      Toast.show('Unable to get chat rooms', Toast.LONG);
    }
  };
  /*
   ** Deleting chat room
   */
  const deleteChatRoom = async (chatRoom: chatRoomType) => {
    console.log('🚀 ~ deleteChatRoom ~ chatRoom:', chatRoom);
    try {
      setLoading(true);
      // api call
      const response = await LOCAL_HOST.delete(`/chat/${chatRoom?._id}/${userData?._id}`);
      console.log('response: deletechatRoom:', response);
      // Remove the chat room from the state using its ID
      updateChatRooms([chatRoom], 'REMOVE_CHAT');
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
              onPress: () => deleteChatRoom(chatItem),
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
   ** Pull to refresh the screen
   */
  const onRefresh = async () => {
    setRefreshing(false);
    fetchChatRooms(pageNum);
  };
  /*
   ** Lifecycle methods
   */
  useEffect(() => {
    fetchChatRooms();
  }, []);

  // This useEffect handles the setting up and tearing down of socket event listeners.
  useEffect(() => {
    /*
     ** when messages is recieved
     */
    const updateChatRoomOnMessage = async (roomId: string) => {
      console.log('🚀 ~ updateChatRoomOnMessage ~ roomId:', roomId);
      // finding wheather we are receiving messages frmo exiting chat or not
      const chatRoomExists = chatRooms.find(chatRoom => chatRoom._id === roomId);
      // if the chat exit push that chat to top other wise make a api call and get data and then push it on the top
      if (chatRoomExists) {
        // upating chat on top
        updateChatRooms([chatRoomExists], 'PUSH_TOP_CHAT');
      } else {
        try {
          // Fetch the chat room if it's not in the current list
          const chatRoomData = await LOCAL_HOST.get(`/chatRoom/${roomId}`);
          const newChatRoom = chatRoomData?.data?.data;

          if (newChatRoom) {
            // Push the new chat room to the top
            updateChatRooms([newChatRoom], 'PUSH_CHAT');
          }
        } catch (error) {
          console.error('Error fetching chat room:', error);
          Toast.show('Unable to get chat room details', Toast.LONG);
        }
      }
    };
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;

    // Set up event listeners for various socket events:

    // Listener for the initiation of a new chat.
    socket.on(ChatEventEnum.NEW_CHAT_EVENT, (chatRoom: chatRoomType) => {
      console.log('🚀 ~ NEW_CHAT_EVENT', chatRoom);
      updateChatRooms([chatRoom], 'PUSH_CHAT');
    });

    // Listener for when a group's name is updated.
    socket.on(ChatEventEnum.UPDATE_GROUP_NAME_EVENT, data => {
      console.log('group name changes', data);
    });

    // Listener for when a new message is received.
    socket.on(ChatEventEnum.MESSAGE, (message: chatMessageType) => {
      console.log('🚀 ~incoming message : MESSAGE', message);
      updateChatRoomOnMessage(message?.chatRoom);
    });
    // When the component using this hook unmounts or if `socket` or `chats` change:
    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(ChatEventEnum.NEW_CHAT_EVENT);
      socket.off(ChatEventEnum.UPDATE_GROUP_NAME_EVENT);
      socket.off(ChatEventEnum.MESSAGE);
    };
  }, [socket, updateChatRooms]);

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
        // TODO: TEST THIS
        onEndReached={() => pageNum < totalPage && fetchChatRooms(pageNum + 1)}
        onEndReachedThreshold={2}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
