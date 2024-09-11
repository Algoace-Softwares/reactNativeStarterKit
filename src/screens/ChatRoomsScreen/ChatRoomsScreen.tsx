import {Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppScreen, AppText, BackButton, FloatingButton, Loading, MessengerCard} from '../../components';
import {useAppStore} from '../../store';
import {getChatRooms} from '../../store/userSlice/userApiServices';
import {useHeader} from '../../hooks/useHeader';
import {COLORS} from '../../theme';
import styles from './style';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {chatRoomType} from '../../@types';
import Toast from 'react-native-simple-toast';
import {LOCAL_HOST} from '../../api';
import {appUtils} from '../../utils';

const ChatRoomsScreen = () => {
  /*
   * Hooks
   */
  const chatRooms = useAppStore(state => state.chatRooms);
  console.log('🚀 ~ ChatRoomsScreen ~ chatRooms:', chatRooms);
  const userData = useAppStore(state => state.userData);
  const setChatRooms = useAppStore(state => state.setChatRooms);
  const navigation = useAppNavigation();
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  // const [deleteConvModal, setDeleteConvModal] = useState(false);
  // const [selectedConvData, setSelectedConvData] = useState({
  //   roomId: '',
  //   indexNumber: 0,
  // });
  /*
   ** Lifecycle methods
   */
  useEffect(() => {
    // Fetch chat rooms
    const fetchChatRooms = async () => {
      try {
        setLoading(true);
        await getChatRooms(userData?._id as string);
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
  /*
   ** Deleting chat room
   */
  const deleteChatRooms = async (room: chatRoomType) => {
    try {
      const response = await LOCAL_HOST.delete(`/chat/${room?._id}/${userData?._id}`);
      console.log('response: deletechatRoom:', response);
    } catch (error) {
      console.log('🚀 ~ deleteChatRooms ~ error:', error);
      Toast.show('Unable to delete chat room', Toast.LONG);
    }
  };
  /*
   ** report chat room
   */
  const reportCharRoom = async (room: chatRoomType) => {
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
      const reciever = 'info@knecthub.live';
      await appUtils.sendEmail(subject, body, reciever);
    } catch (error) {
      console.log('🚀 ~ deleteChatRooms ~ error:', error);
      Toast.show('Unable to send email. Invalid email configuration', Toast.LONG);
    }
  };
  /*
   ** Marking converstaion as read
   */
  const markConversationAsRead = async (room: chatRoomType) => {
    try {
      const response = await LOCAL_HOST.patch(`/chat/count/${room?._id}/${userData?._id}`);
      console.log('response: markConversationAsRead:', response);
    } catch (error) {
      console.log('🚀 ~ markConversationAsRead ~ error:', error);
      Toast.show('Unable take action', Toast.LONG);
    }
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
        ListEmptyComponent={
          <AppText transText={'noRoomFound'} presetStyle={'default'} style={styles.notFoundLableStyling} />
        }
        ListHeaderComponent={loading ? <Loading fullScreen /> : <></>}
        style={styles.flatListContStyle}
        horizontal={false}
        // extraData={extraDataForMessageList}
        showsVerticalScrollIndicator={false}
        renderItem={({item: chatItem}) => {
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
          return (
            <MessengerCard
              item={chatItem}
              onLongPress={() => {
                Alert.alert('Chat Rooms actions', '', [
                  {
                    text: 'Delete chat room',
                    onPress: () => deleteChatRooms(chatItem),
                  },
                  {
                    text: 'Report chat room',
                    onPress: () => reportCharRoom(chatItem),
                  },
                  {text: 'Mark as read', onPress: () => markConversationAsRead(chatItem)},
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ]);
              }}
            />
          );
        }}
      />
      <FloatingButton
        fillColor={COLORS.buttonTextSeconday}
        onPressBtn={() => navigation.navigate('UserSearchScreen')}
      />
      {/* report and delete modal */}
      {/* <ReportDeleteChatModal
        convId={selectedConvData.roomId}
        visible={deleteConvModal}
        setVisible={setDeleteConvModal}
        indexNumber={selectedConvData.indexNumber}
      /> */}
    </AppScreen>
  );
};

export default ChatRoomsScreen;
