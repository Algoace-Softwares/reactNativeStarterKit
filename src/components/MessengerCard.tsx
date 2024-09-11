import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {chatRoomType, lastMessageType} from '../@types';
import {COLORS, Globaltypography, SPACING} from '../theme';
import {SVG} from '../assets';
import {useTheme} from '@react-navigation/native';
import AppImage from './common/AppImage';
import AppText from './common/AppText';
import {useAppNavigation} from '../hooks/useAppNavigation';

interface roomCardType {
  onLongPress: () => void;
  item: chatRoomType;
}

export default function MessengerCard(props: roomCardType): JSX.Element {
  // destuctruing props
  const {item, onLongPress} = props;
  /*
   ** Hooks
   */
  const {colors} = useTheme();
  const navigation = useAppNavigation();
  /*
   ** Functions
   */
  /*
   ** Formating dates as per requorement
   */
  const formatMessageDate = (itemDate = new Date().toISOString()): string => {
    const temp1 = new Date(itemDate).getTime();
    // getting diff with today time
    let diffTemp = new Date().getTime() - temp1;

    // converting into seconds
    diffTemp = Math.floor(diffTemp / 1000);
    if (diffTemp <= 5) {
      return 'now';
    } else if (diffTemp > 5 && diffTemp <= 60) {
      return `${diffTemp} sec ago`;
    } else if (diffTemp > 60 && diffTemp < 3600) {
      return `${Math.floor(diffTemp / 60)} min ago`;
    } else if (diffTemp >= 3600 && diffTemp < 86400) {
      return `${Math.floor(diffTemp / 3600)} hrs ago`;
    } else {
      const formatDateObj = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'short',
      });

      return `${formatDateObj.format(temp1)}`;
    }
  };
  /*
   ** Rendering last message text or icon
   */
  const renderLastMessage = (lastMessage: lastMessageType | undefined) => {
    if (lastMessage && lastMessage?.messageType === 'TEXT') {
      return (
        <AppText style={styles.nameStyle} numberOfLines={1}>
          {lastMessage.text}
        </AppText>
      );
    } else if (lastMessage && lastMessage?.messageType === 'IMAGE') {
      return (
        <View>
          <SVG.imageIcon fill={colors.text} />
          <AppText style={styles.nameStyle} numberOfLines={1}>
            Image
          </AppText>
        </View>
      );
    } else if (lastMessage && lastMessage?.messageType === 'FILE') {
      return (
        <View>
          <SVG.fileIcon fill={colors.text} />
          <AppText style={styles.nameStyle} numberOfLines={1}>
            File
          </AppText>
        </View>
      );
    } else if (lastMessage && lastMessage?.messageType === 'VIDEO') {
      return (
        <View>
          <SVG.fileIcon fill={colors.text} />
          <AppText style={styles.nameStyle} numberOfLines={1}>
            Video
          </AppText>
        </View>
      );
    } else if (lastMessage && lastMessage?.messageType === 'VOICE') {
      return (
        <View>
          <SVG.audioIcon fill={colors.text} />
          <AppText style={styles.nameStyle} numberOfLines={1}>
            Audio
          </AppText>
        </View>
      );
    } else {
      return (
        <AppText style={styles.nameStyle} numberOfLines={1}>
          {' '}
        </AppText>
      );
    }
  };
  // Rerendering
  return (
    <TouchableOpacity
      style={styles.mainViewStyle}
      onLongPress={onLongPress}
      onPress={() =>
        navigation.navigate('ChatScreen', {room: item, roomName: item.roomName, roomImage: item.profileImage || ''})
      }>
      <View style={styles.containerStyle}>
        {item.profileImage ? (
          <AppImage source={{uri: item.profileImage}} style={styles.userProfilePic} maxHeight={60} maxWidth={60} />
        ) : (
          <SVG.UserIcon fill={colors.text} width={50} height={50} />
        )}
        <View style={styles.lableTextstyle}>
          <AppText style={styles.nameStyle} numberOfLines={1}>
            {item?.roomName}
          </AppText>
          {renderLastMessage(item.lastMessage)}
        </View>
        <AppText style={styles.timeLableStyle} numberOfLines={1}>
          {formatMessageDate(new Date(item?.updatedAt)?.toISOString())}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: SPACING.sm,
  },
  lableTextstyle: {
    height: '100%',
    justifyContent: 'space-around',
    marginLeft: SPACING.sm,
    paddingVertical: SPACING.xs,
    width: '65%',
  },
  mainViewStyle: {
    borderRadius: 10,
    width: '100%',
  },
  nameStyle: {
    color: COLORS.buttonTextSeconday,
    ...Globaltypography.button,
  },
  timeLableStyle: {
    alignSelf: 'baseline',
    marginTop: SPACING.xs,
  },
  userProfilePic: {
    borderRadius: 100,
    height: 50,
    width: 50,
  },
});
