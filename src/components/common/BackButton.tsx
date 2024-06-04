import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {SVG} from '../../assets';
import {COLORS} from '../../theme';

interface backBtnType {
  fillColor?: string;
  viewStyle?: ViewStyle;
}

export default function BackButton(props: backBtnType): JSX.Element {
  /*
   ** Props
   */
  const {fillColor = COLORS.background, viewStyle = {}} = props;
  /*
   ** Hooks
   */
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={[styles.mainViewStyle, viewStyle]} onPress={() => navigation.goBack()}>
      <SVG.BackIcon fill={fillColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    alignItems: 'center',
    backgroundColor: COLORS.palette.secondary300,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginLeft: 21,
    marginTop: 21,
    width: 40,
  },
});
