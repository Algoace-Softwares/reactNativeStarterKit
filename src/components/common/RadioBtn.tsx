import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {GlobalStyles, COLORS} from '../../assets';

interface radioBtnStyle {
  onPress: () => void;
  title: string;
  checked: boolean;
  titleStyle?: ViewStyle;
  selectedColor: string;
  unSelectedColor: string;
  outerStyle?: ViewStyle;
  innerStyle?: ViewStyle;
  mainStyle?: ViewStyle;
}
function RadioBtn({
  onPress,
  title = '',
  checked = false,
  titleStyle = {},
  selectedColor = 'orange',
  unSelectedColor = 'gray',
  outerStyle = {},
  innerStyle = {},
  mainStyle = {},
}: radioBtnStyle): JSX.Element {
  return (
    <TouchableOpacity style={[styles().container, mainStyle]} onPress={onPress}>
      <View style={[styles().outside, outerStyle]}>
        <View style={[styles(checked, unSelectedColor, selectedColor).inside, innerStyle]} />
      </View>
      <Text style={[styles().mainLabelStyle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default RadioBtn;

const styles = (checked?: boolean, unSelectedColor?: string, selectedColor?: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    outside: {
      height: 20,
      width: 20,
      padding: 5,
      borderRadius: 100,
      borderColor: COLORS.grey5,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',

      // marginRight: 5,
    },

    inside: {
      height: 13,
      width: 13,
      borderRadius: 100,
      backgroundColor: checked ? selectedColor : unSelectedColor,
    },
    mainLabelStyle: {
      color: COLORS.grey6,
      ...GlobalStyles.l7,
      marginLeft: 10,
      marginTop: 3,
    },
  });
