import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/';

export default function SaperatorLine({
  veiwStyle2 = {},
}: {
  veiwStyle2: ViewStyle;
}): JSX.Element {
  return <View style={[styles.viewStyle, veiwStyle2]} />;
}

const styles = StyleSheet.create({
  viewStyle: {
    height: 20,
    width: 1.5,
    backgroundColor: COLORS.grey4,
    marginHorizontal: 5,
  },
});
