import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, ICONS} from '../../assets';

interface backBtnType {
  fillColor: string;
  viewStyle?: ViewStyle;
}

export default function BackButton(props: backBtnType): JSX.Element {
  // destructring props
  const {fillColor = 'white', viewStyle = {}} = props;

  //Navigtion
  const navigation = useNavigation();
  // Functions
  const backPressed = (): void => {
    navigation.goBack();
  };
  // Rendering
  return (
    <TouchableOpacity style={[styles.mainViewStyle, viewStyle]} onPress={backPressed}>
      <ICONS.BackIcon color={fillColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grey5,
    marginLeft: 21,
    marginTop: 21,
    zIndex: 9999,
  },
});
