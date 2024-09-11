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
          return (
            <UserCard
              item={user}
              onPressCard={() =>
                navigation.navigate('ChatScreen', {
                  member: user,
                  roomName: user.name,
                  roomImage: user.profileImage,
                  newChat: true,
                })
              }
            />
          );
        }}
      />
    </AppScreen>
  );
};

export default UserSearchScreen;
