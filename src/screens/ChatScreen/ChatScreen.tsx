import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppScreen, AppText, BackButton, FloatingButton, Loading} from '../../components';
import {useAppStore} from '../../store';
import {getChatRooms} from '../../store/userSlice/userApiServices';
import RoomCard from '../../components/MessengerCard';
import {useHeader} from '../../hooks/useHeader';
import {COLORS} from '../../theme';

const ChatScreen = () => {
  /*
   * Hooks
   */
  const chatRooms = useAppStore(state => state.chatRooms);
  const userData = useAppStore(state => state.userData);
  const setChatRooms = useAppStore(state => state.setChatRooms);
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
      <FlatList
        data={chatRooms}
        keyExtractor={(_, index) => `index-${index}`}
        ListEmptyComponent={<AppText transText={'notFound'} presetStyle={'default'} />}
        ListHeaderComponent={loading ? <Loading fullScreen /> : <></>}
        horizontal={false}
        // extraData={extraDataForMessageList}
        showsVerticalScrollIndicator={false}
        renderItem={({item: chatItem}) => <RoomCard item={chatItem} onLongPress={data => console.log(data)} />}
      />
      <FloatingButton fillColor={COLORS.buttonTextSeconday} />
    </AppScreen>
  );
};

export default ChatScreen;
