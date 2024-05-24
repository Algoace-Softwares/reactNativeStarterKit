import {ActivityIndicator, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SVG, WIDTH} from '../../assets';
import {imageObjectType} from '../../screens/SignupScreen/types';

export default function ProfileImageUploader(props: ProfileImageUploaderType): JSX.Element {
  // destructring props
  const {loading, onPressCamera, imageAsset = null} = props;
  console.log('image asset is', imageAsset);
  return (
    <View style={styles.imageViewStyle}>
      {imageAsset ? (
        <Image source={{uri: imageAsset?.uri}} style={styles.profileImageStyle} resizeMode={'cover'} />
      ) : (
        <SVG.UserIcon width={WIDTH * 0.27} height={WIDTH * 0.27} fill={COLORS.seconday} />
      )}
      <TouchableOpacity style={styles.IconMainViewStyle} onPress={onPressCamera}>
        {loading ? (
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        ) : (
          <SVG.CameraIcon width={WIDTH * 0.06} height={WIDTH * 0.06} fill={COLORS.seconday} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  IconMainViewStyle: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 17,
    height: 35,
    justifyContent: 'center',
    position: 'absolute',
    right: 5,
    top: -10,
    width: 35,
  },
  imageViewStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.PrimaryOpacity,
    borderRadius: 100,
    height: WIDTH * 0.3,
    justifyContent: 'center',
    padding: 10,
    width: WIDTH * 0.3,
  },

  profileImageStyle: {
    borderRadius: 100,
    height: WIDTH * 0.3,
    width: WIDTH * 0.3,
  },
});

interface ProfileImageUploaderType {
  loading: boolean;
  onPressCamera: () => void;
  imageAsset: null | imageObjectType;
}
