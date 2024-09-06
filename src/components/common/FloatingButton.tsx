import React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {SVG} from '../../assets';
import {COLORS, CustomTheme, DEFAULT_COLORS, HEIGHT, WIDTH} from '../../theme';

interface floatingBtnType {
  fillColor?: string;
  viewStyle?: ViewStyle;
  onPressBtn?: () => void;
}

export default function FloatingButton(props: floatingBtnType): JSX.Element {
  /*
   ** Props
   */
  const {fillColor = COLORS.background, viewStyle = {}, onPressBtn} = props;
  /*
   ** Hooks
   */
  const {colors} = useTheme() as CustomTheme;

  return (
    <TouchableOpacity style={[styles.mainViewStyle, viewStyle]} onPress={onPressBtn}>
      <SVG.PlusIcon fill={fillColor || colors.background} />
      {/* <Text>1</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    elevation: 7,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: WIDTH * 0.1,
    shadowColor: DEFAULT_COLORS.palette.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    top: HEIGHT - 160,
    width: 60,
  },
});
