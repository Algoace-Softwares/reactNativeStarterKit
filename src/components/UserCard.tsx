import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {userDataType} from '../@types';
import {COLORS, Globaltypography, SPACING} from '../theme';
import {SVG} from '../assets';
import {useTheme} from '@react-navigation/native';
import AppImage from './common/AppImage';
import AppText from './common/AppText';

interface userCardType {
  onPressCard: (item: userDataType) => void;
  item: userDataType;
}

export default function UserCard(props: userCardType): JSX.Element {
  // destuctruing props
  const {item, onPressCard} = props;
  const {colors} = useTheme();
  /*
   ** Hooks
   */
  /*
   ** Functions
   */

  // Rerendering
  return (
    <TouchableOpacity style={styles.mainViewStyle} onPress={() => onPressCard(item)}>
      <View style={styles.containerStyle}>
        {item.profileImage ? (
          <AppImage source={{uri: item.profileImage}} style={styles.userProfilePic} maxHeight={60} maxWidth={60} />
        ) : (
          <SVG.UserIcon fill={colors.text} width={50} height={50} />
        )}
        <View style={styles.lableTextstyle}>
          <AppText style={styles.nameStyle} numberOfLines={1}>
            {item?.name}
          </AppText>
          <AppText style={styles.nameStyle} numberOfLines={1}>
            {item?.email}
          </AppText>
        </View>
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
