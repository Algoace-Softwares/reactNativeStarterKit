import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppScreen, AppText, BackButton, FloatingButton, Loading, MessengerCard} from '../../components';
import {useAppStore} from '../../store';
import {getChatRooms} from '../../store/userSlice/userApiServices';
import {useHeader} from '../../hooks/useHeader';
import {COLORS} from '../../theme';
import styles from './style';
import {useAppNavigation} from '../../hooks/useAppNavigation';

const items = [
  {
    _id: '66cc62b3feb1ad31b71ffac3',
    roomName: 'ONE-TO-ONE Chat',
    isGroupChat: false,
    createdBy: '669e0842bc5fbb3c9a0a4759',
    members: [
      {
        _id: '669e0842bc5fbb3c9a0a4759',
        email: 'javonte13@gmail.com',
        name: 'shaheer ahmed',
        nickName: 'abcd',
        profileImage:
          'https://loci-storage-bucket-dev.s3.amazonaws.com/669bacdf3b9504a65cb2baea/profileImages/testing.png',
      },
    ],
    admins: ['669e0842bc5fbb3c9a0a4759'],
    profileImage: '',
    roomPrivacy: 'PUBLIC',
    createdAt: '2024-08-26T11:10:43.584Z',
    updatedAt: '2024-08-26T11:10:43.584Z',
    __v: 0,
  },
  {
    _id: '66cc69c4573eba9be66c6f70',
    roomName: 'ONE-TO-ONE Chat',
    isGroupChat: false,
    createdBy: '669e0842bc5fbb3c9a0a4759',
    members: [
      {
        _id: '669e0843bc5fbb3c9a0a475b',
        email: 'jeanie17@hotmail.com',
        name: 'Mireya_Klein',
        nickName: 'Mr.',
        profileImage: '',
      },
      {
        _id: '669e0842bc5fbb3c9a0a4759',
        email: 'javonte13@gmail.com',
        name: 'shaheer ahmed',
        nickName: 'abcd',
        profileImage:
          'https://loci-storage-bucket-dev.s3.amazonaws.com/669bacdf3b9504a65cb2baea/profileImages/testing.png',
      },
    ],
    admins: ['669e0842bc5fbb3c9a0a4759'],
    profileImage: '',
    roomPrivacy: 'PUBLIC',
    createdAt: '2024-08-26T11:40:52.037Z',
    updatedAt: '2024-08-27T04:38:13.208Z',
    __v: 0,
    lastMessage: '66cd58352a09b2cb14f79226',
  },
  {
    _id: '66cd5319b32ca1c78c4fe6be',
    roomName: 'ONE-TO-ONE Chat',
    isGroupChat: false,
    createdBy: '669e0842bc5fbb3c9a0a4759',
    members: [
      {
        _id: '669e0842bc5fbb3c9a0a4759',
        email: 'javonte13@gmail.com',
        name: 'shaheer ahmed',
        nickName: 'abcd',
        profileImage:
          'https://loci-storage-bucket-dev.s3.amazonaws.com/669bacdf3b9504a65cb2baea/profileImages/testing.png',
      },
    ],
    admins: ['669e0842bc5fbb3c9a0a4759'],
    profileImage: '',
    roomPrivacy: 'PUBLIC',
    createdAt: '2024-08-27T04:16:25.230Z',
    updatedAt: '2024-08-27T04:16:25.230Z',
    __v: 0,
  },
  {
    _id: '66cd5335b32ca1c78c4fe6c8',
    roomName: 'ONE-TO-ONE Chat',
    isGroupChat: false,
    createdBy: '669e0842bc5fbb3c9a0a4759',
    members: [
      {
        _id: '669e0845bc5fbb3c9a0a475d',
        email: 'morgan.denesik67@yahoo.com',
        name: 'Jabari_Lubowitz',
        nickName: 'Ms.',
        profileImage: '',
      },
      {
        _id: '669e0842bc5fbb3c9a0a4759',
        email: 'javonte13@gmail.com',
        name: 'shaheer ahmed',
        nickName: 'abcd',
        profileImage:
          'https://loci-storage-bucket-dev.s3.amazonaws.com/669bacdf3b9504a65cb2baea/profileImages/testing.png',
      },
    ],
    admins: ['669e0842bc5fbb3c9a0a4759'],
    profileImage: '',
    roomPrivacy: 'PUBLIC',
    createdAt: '2024-08-27T04:16:53.698Z',
    updatedAt: '2024-08-27T04:16:53.698Z',
    __v: 0,
  },
  {
    _id: '66cd7034d4f98a82c7a850f1',
    roomName: 'new group',
    isGroupChat: true,
    createdBy: '669e0842bc5fbb3c9a0a4759',
    members: [
      {
        _id: '669e0842bc5fbb3c9a0a4759',
        email: 'javonte13@gmail.com',
        name: 'shaheer ahmed',
        nickName: 'abcd',
        profileImage:
          'https://loci-storage-bucket-dev.s3.amazonaws.com/669bacdf3b9504a65cb2baea/profileImages/testing.png',
      },
      {
        _id: '669e0843bc5fbb3c9a0a475b',
        email: 'jeanie17@hotmail.com',
        name: 'Mireya_Klein',
        nickName: 'Mr.',
        profileImage: '',
      },
    ],
    admins: ['669e0842bc5fbb3c9a0a4759'],
    profileImage: '',
    roomPrivacy: 'PUBLIC',
    createdAt: '2024-08-27T06:20:36.215Z',
    updatedAt: '2024-08-27T07:10:23.223Z',
    __v: 0,
  },
];

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
      transTitle: 'chatRoomsScreen',
      LeftActionComponent: <BackButton />,
    },
    [],
  );

  return (
    <AppScreen>
      <FlatList
        data={items}
        keyExtractor={(_, index) => `index-${index}`}
        ListEmptyComponent={
          <AppText transText={'notFound'} presetStyle={'default'} style={styles.notFoundLableStyling} />
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
          return <MessengerCard item={chatItem} onLongPress={data => console.log(data)} />;
        }}
      />
      <FloatingButton
        fillColor={COLORS.buttonTextSeconday}
        onPressBtn={() => navigation.navigate('UserSearchScreen')}
      />
    </AppScreen>
  );
};

export default ChatRoomsScreen;
