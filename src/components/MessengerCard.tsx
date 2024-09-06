import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {chatRoomType} from '../@types';
import {COLORS, Globaltypography, SPACING} from '../theme';
import {SVG} from '../assets';
import {useTheme} from '@react-navigation/native';
import AppImage from './common/AppImage';
import AppText from './common/AppText';

interface roomCardType {
  onLongPress: (item: chatRoomType) => void;
  item: chatRoomType;
}

export default function MessengerCard(props: roomCardType): JSX.Element {
  // destuctruing props
  const {item, onLongPress} = props;
  const {colors} = useTheme();
  console.log('🚀 ~ RoomCard ~ item:', item.profileImage);
  /*
   ** Hooks
   */
  /*
   ** Functions
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
  // Rerendering
  return (
    <TouchableOpacity style={styles.mainViewStyle} onLongPress={() => onLongPress(item)}>
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
          <AppText style={styles.nameStyle} numberOfLines={1}>
            {item?.lastMessage}
          </AppText>
        </View>
        <AppText style={{}} numberOfLines={1}>
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
    // backgroundColor: 'red',
    // justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
  },
  lableTextstyle: {
    height: '100%',
    justifyContent: 'space-around',
    marginLeft: SPACING.sm,
    // backgroundColor: 'red',
    width: '70%',
  },
  mainViewStyle: {
    borderRadius: 10,
    width: '100%',
  },
  nameStyle: {
    color: COLORS.buttonTextSeconday,
    ...Globaltypography.button,
  },

  userProfilePic: {
    borderRadius: 100,
    height: 50,
    width: 50,
  },
});
