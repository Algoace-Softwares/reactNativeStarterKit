import React, {useState} from 'react';
import {AppScreen, AppText, BackButton, InputTextLabel, Loading, UserCard} from '../../components';
import {useAppStore} from '../../store';
import {useHeader} from '../../hooks/useHeader';
import {userDataType} from '../../@types';
import {AUTH_API, LOCAL_HOST} from '../../api';
import Toast from 'react-native-simple-toast';
import {FlatList} from 'react-native';
import styles from './style';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {appUtils} from '../../utils';

const UserSearchScreen = () => {
  /*
   * Hooks
   */
  const userData = useAppStore(state => state.userData) as userDataType;
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
        setUsers(searchedUsers);
      } else if (searchedUsers && pageNum > 1) {
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
  const onCardPress = async (user: userDataType) => {
    try {
      setLoading(true);
      // checking if room exits locally in chat rooms
      let roomData = appUtils.checkDualMemberChat(chatRooms, userData._id, user._id);
      console.log('🚀 ~ onCardPress ~ roomData:', roomData);
      if (!roomData) {
        // api call to check if room exits or not
        // we are chcking room on server bacause our chatRoom return data in paginated format suppose we have extract 20 room
        // and user want to initiate a chat which is not currently available on state varibale this mean we need to check
        // if this users chat exits or not

        const response = await LOCAL_HOST.get(`/chat`, {
          params: {
            firstUser: userData._id,
            secondUser: user._id,
          },
        });
        console.log('🚀 ~ fetchRoom ~ params:', response);
        roomData = response.data.data;
      }
      navigation.navigate('ChatScreen', {
        room: roomData,
        member: user,
        roomName: user.name,
        roomImage: user.profileImage,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('��� ~ onCardPress ~ error:', error);
      Toast.show('Unable to start chat', Toast.LONG);
    }
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
