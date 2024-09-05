import {FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {AppScreen, AppText, BackButton, Loading} from '../../components';
import {useAppStore} from '../../store';
import {getChatRooms} from '../../store/userSlice/userApiServices';
import RoomCard from '../../components/RoomCard';

const ChatScreen = () => {
  /*
   * Hooks
   */
  const navigation = useAppNavigation();
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

  return (
    <AppScreen>
      <BackButton />
      <Text>Chat Screen</Text>
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
    </AppScreen>
  );
};

export default ChatScreen;
