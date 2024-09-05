import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {chatRoomType} from '../@types';
import {COLORS} from '../theme';
import AppImage from './common/AppImage';
import AppText from './common/AppText';
import {IMAGES} from '../assets';

interface roomCardType {
  onLongPress: (item: chatRoomType) => void;
  item: chatRoomType;
}

export default function RoomCard(props: roomCardType): JSX.Element {
  // destuctruing props
  const {item, onLongPress} = props;
  /*
   ** Hooks
   */
  // Rerendering
  return (
    <TouchableOpacity style={styles.mainViewStyle} onLongPress={() => onLongPress(item)}>
      <View style={styles.containerStyle}>
        <View style={styles.profileContainerStyle}>
          {item.profileImage ? (
            <AppImage source={{uri: item.profileImage}} style={styles.userProfilePic} />
          ) : (
            <AppImage source={IMAGES.blankAvatar} style={styles.userProfilePic} maxHeight={50} maxWidth={50} />
          )}
          <View>
            <AppText style={styles.nameStyle} numberOfLines={1}>
              {item?.roomName}
            </AppText>
            <AppText style={styles.nameStyle} numberOfLines={1}>
              {item?.lastMessage}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainViewStyle: {
    borderRadius: 10,
    flex: 1,
    marginTop: 20,
    width: '100%',
  },
  nameStyle: {
    color: COLORS.buttonTextSeconday,
    fontSize: 15,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  profileContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userProfilePic: {
    borderRadius: 50,
    marginRight: 10,
  },
});
