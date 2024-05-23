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
  /*
   ** Props
   */
  const {text1 = '', text2 = '', viewStyle = {}, upperTextStyle = {}} = props;

  return (
    <View style={[styles.mainView, viewStyle]}>
      <Text style={[styles.upperTextStyle, upperTextStyle]}>{text1}</Text>
      <Text style={styles.lowerTextStyle}>{text2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lowerTextStyle: {color: COLORS.seconday, ...GlobalStyles.b1, marginTop: 10},
  mainView: {
    marginLeft: 21,
    marginVertical: 30,
  },
  upperTextStyle: {
    color: COLORS.seconday,
    ...GlobalStyles.h1,
  },
});
