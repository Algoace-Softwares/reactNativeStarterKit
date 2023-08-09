import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets';

interface headerRightButtonType {
  children: JSX.Element;
  viewStyle?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
}

export default function HeaderRightButton({
  children = <></>,
  viewStyle = {},
  onPress = () => {},
  loading = false,
}: headerRightButtonType): JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.mainViewStyle, viewStyle]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={'small'} color={COLORS.black} />
      ) : (
        <View>{children}</View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    position: 'absolute',
    right: 21,
    top: 30,
  },
});
