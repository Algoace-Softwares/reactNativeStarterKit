import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../../assets/styles';
import {COLORS} from '../../assets';

interface authHeaderType {
  text1: string;
  text2?: string;
  viewStyle?: ViewStyle;
  upperTextStyle?: ViewStyle;
}

export default function AuthHeader(props: authHeaderType): JSX.Element {
  // destructing props
  const {text1 = '', text2 = '', viewStyle = {}, upperTextStyle = {}} = props;

  return (
    <View style={[styles.mainView, viewStyle]}>
      <Text style={[styles.upperTextStyle, upperTextStyle]}>{text1}</Text>
      <Text style={[styles.lowerTextStyle]}>{text2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  upperTextStyle: {
    color: COLORS.primary,
    ...GlobalStyles.h1,
  },
  lowerTextStyle: {marginTop: 10, color: COLORS.seconday, ...GlobalStyles.b1},
  mainView: {
    marginVertical: 30,
    marginLeft: 21,
  },
});
