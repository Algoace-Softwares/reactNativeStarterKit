import React, {useEffect, useState} from 'react';
import {AppScreen, BackButton, FloatingButton, InputTextLabelDropDown} from '../../components';
import {useAppStore} from '../../store';
import {getChatRooms} from '../../store/userSlice/userApiServices';
import {useHeader} from '../../hooks/useHeader';
import {COLORS} from '../../theme';
import {userDataType} from '../../@types';

const UserSearchScreen = () => {
  /*
   * Hooks
   */
  const userData = useAppStore(state => state.userData);
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  console.log('🚀 ~ UserSearchScreen ~ loading:', loading);
  const [users, setUsers] = useState<userDataType[]>([]);
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
      setUsers([]);
    };
  }, [userData?._id]);
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

  return (
    <AppScreen>
      <InputTextLabelDropDown
        textLable='findUser'
        placeHolder='Type here....'
        onChangeText={text => console.log(text)}
        dropDown={true}
        dropDownData={users as any}
      />

      <FloatingButton fillColor={COLORS.buttonTextSeconday} />
    </AppScreen>
  );
};

export default UserSearchScreen;
