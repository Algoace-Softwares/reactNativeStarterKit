import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SVG} from '../../assets';

interface backBtnType {
  fillColor: string;
  viewStyle?: ViewStyle;
}

export default function BackButton(props: backBtnType): JSX.Element {
  /*
   ** Props
   */
  const {fillColor = 'white', viewStyle = {}} = props;
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
    backgroundColor: COLORS.grey5,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginLeft: 21,
    marginTop: 21,
    width: 40,
    zIndex: 9999,
  },
});
