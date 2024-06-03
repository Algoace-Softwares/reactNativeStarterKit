import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from './colors';

export const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

console.log('🚀 ~ COLORS: in global styles', COLORS);

export const GlobalStyles = StyleSheet.create({
  /*
   ** Global styles
   */
  btn2textStyle: {
    color: COLORS.buttonTextSeconday,
  },
  mainContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
  },

  smallBtn1Style: {
    backgroundColor: COLORS.button,
    height: 45,
    width: WIDTH * 0.4,
  },
  smallBtn2Style: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.buttonBorder,
    borderWidth: 0.5,
    height: 45,
    width: WIDTH * 0.4,
  },
});
