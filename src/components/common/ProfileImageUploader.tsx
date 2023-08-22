import {ActivityIndicator, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, ICONS, WIDTH, GlobalStyles} from '../../assets';
import {imageObjectType} from '../../screens/SignupScreen/types';

export default function ProfileImageUploader(props: ProfileImageUploaderType): JSX.Element {
  // destructring props
  const {loading, onPressCamera, imageAsset = null} = props;
  console.log('image asset is', imageAsset);
  return (
    <View style={styles.imageViewStyle}>
      {imageAsset ? (
        <Image
          source={{uri: imageAsset?.uri}}
          style={styles.profileImageStyle}
          resizeMode={'cover'}
        />
      ) : (
        <ICONS.UserIcon width={WIDTH * 0.34} height={WIDTH * 0.34} color={COLORS.grey5} />
      )}
      <TouchableOpacity style={styles.IconMainViewStyle} onPress={onPressCamera}>
        {loading ? (
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        ) : (
          <ICONS.CameraIcon width={25} height={25} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageViewStyle: {
    width: WIDTH * 0.34,
    height: WIDTH * 0.34,
    borderRadius: 100,
    backgroundColor: COLORS.PrimaryOpacity,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  IconMainViewStyle: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: COLORS.primaryLight,
    position: 'absolute',
    top: -10,
    right: 5,
    ...GlobalStyles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    width: WIDTH * 0.34,
    height: WIDTH * 0.34,
    borderRadius: 100,
  },
});

interface ProfileImageUploaderType {
  loading: boolean;
  onPressCamera: () => void;
  imageAsset: null | imageObjectType;
}
