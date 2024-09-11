import React, {useState} from 'react';
import {AppScreen, AppText, BackButton, InputTextLabel, Loading, UserCard} from '../../components';
import {useAppStore} from '../../store';
import {useHeader} from '../../hooks/useHeader';
import {userDataType} from '../../@types';
import {AUTH_API} from '../../api';
import Toast from 'react-native-simple-toast';
import {FlatList} from 'react-native';
import styles from './style';
import {useAppNavigation} from '../../hooks/useAppNavigation';

const UserSearchScreen = () => {
  /*
   * Hooks
   */
  const userData = useAppStore(state => state.userData);
  const chatRooms = useAppStore(state => state.chatRooms);
  const navigation = useAppNavigation();
  console.log('🚀 ~ UserSearchScreen ~ userData:', userData);
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  console.log('🚀 ~ UserSearchScreen ~ loading:', loading);
  const [users, setUsers] = useState<userDataType[]>([]);
  const [searchText, setSearchText] = useState('');
  /*
   ** Lifecycle methods
   */

  /*
   ** Rendeing header componenet
   */
  useHeader(
    {
      titleMode: 'center',
      transTitle: 'userSearchScreen',
      LeftActionComponent: <BackButton />,
    },
    [],
  );
  /*
   ** Functions
   */
  /*
   ** Calling functioon when text is changes
   */
  const onChangeText = async (text: string) => {
    console.log('🚀 ~ onChangeText ~ text:', text);
    setLoading(true);
    try {
      const response = await AUTH_API.get('/user/all', {params: {page: 1, limit: 50, name: text?.toLowerCase()}});
      console.log('🚀 ~ onChangeText ~ response:', response);
      const searchedUsers = response.data.data.items;
      const pageNum = response.data.data.page;
      console.log('🚀 ~ onChangeText ~ searchedUsers:', searchedUsers);
      console.log('🚀 ~ onChangeText ~ pageNum:', pageNum);
      if (searchedUsers && pageNum === 1) {
        console.log('2');

        setUsers(searchedUsers);
      } else if (searchedUsers && pageNum > 1) {
        console.log('3');

        setUsers([...users, ...searchedUsers]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('🚀 ~ onChangeText ~ error:', error);
      Toast.show('Unable to fetch users', Toast.LONG);
    }
  };
  /*
   ** When card is pressed
   */
  const onCardPress = (user: userDataType) => {
    const sender = userData?._id as string;
    const receiver = user?._id as string;
    // checking if room exits in local data or not
    const roomData = chatRooms.find(room => {
      // Ensure the room is not a group chat and has exactly two members
      if (!room.isGroupChat && room.members.length === 2) {
        // making key value pair for member array
        const memberIdMap = room.members.reduce(
          (acc, member) => {
            acc[member._id] = true;
            return acc;
          },
          {} as Record<string, boolean>,
        );

        // Check if both sender and receiver IDs are present in the map
        return memberIdMap[sender] && memberIdMap[receiver];
      }
      return false;
    });
    console.log('🚀 ~ roomData ~ roomData:', roomData);

    navigation.navigate('ChatScreen', {
      room: roomData || undefined,
      member: user,
      roomName: user.name,
      roomImage: user.profileImage,
    });
  };
  return (
    <AppScreen>
      <InputTextLabel
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          onChangeText(text);
        }}
        placeHolder={'Search here.....'}
      />
      <FlatList
        data={searchText ? users : []}
        keyExtractor={(_, index) => `index-${index}`}
        ListEmptyComponent={
          searchText?.length > 1 ? (
            <AppText transText={'noResultFound'} presetStyle={'default'} style={styles.notFoundLableStyling} />
          ) : undefined
        }
        ListHeaderComponent={loading ? <Loading fullScreen /> : <></>}
        style={styles.flatListContStyle}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item: user}) => {
          return <UserCard item={user} onPressCard={onCardPress} />;
        }}
      />
    </AppScreen>
  );
};

export default UserSearchScreen;
