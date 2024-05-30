import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from './colors';
import {typography} from './typography';

export const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');
export const GlobalStyles = StyleSheet.create({
  /*
   ** Global styles
   */
  btn2textStyle: {
    color: COLORS.buttonText,
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
  /*
   ** Fonts styles
   */
  // eslint-disable-next-line react-native/sort-styles
  h1: {
    fontFamily: typography.primary.Bold,
    fontSize: 30,
  },
  h2: {
    fontFamily: typography.primary.Bold,
    fontSize: 24,
  },
  h3: {
    fontFamily: typography.primary.Bold,
    fontSize: 14,
  },
  h4: {
    fontFamily: typography.primary.Bold,
    fontSize: 36,
  },
  h5: {
    fontFamily: typography.primary.Bold,
    fontSize: 18,
  },
  // labelfont style
  l1: {
    fontFamily: typography.primary.Medium,
    fontSize: 14,
  },
  l2: {
    fontFamily: typography.primary.Regular,
    fontSize: 14,
  },
  l3: {
    fontFamily: typography.primary.Medium,
    fontSize: 16,
  },
  l4: {
    fontFamily: typography.primary.Regular,
    fontSize: 16,
  },
  l5: {
    fontFamily: typography.primary.Regular,
    fontSize: 13,
  },
  l6: {
    fontFamily: typography.primary.Regular,
    fontSize: 12,
  },
  l7: {
    fontFamily: typography.primary.Regular,
    fontSize: 16,
  },
  l8: {
    fontFamily: typography.primary.Regular,
    fontSize: 18,
  },
  l9: {
    fontFamily: typography.primary.Regular,
    fontSize: 12,
    lineHeight: 16,
  },
  // body font style
  b1: {
    fontFamily: typography.primary.Medium,
    fontSize: 14,
  },
  b2: {
    fontFamily: typography.primary.Regular,
    fontSize: 14,
  },
  b3: {
    fontFamily: typography.primary.Light,
    fontSize: 14,
  },
  b4: {
    fontFamily: typography.primary.Regular,
    fontSize: 12,
  },
  b5: {
    fontFamily: typography.primary.Regular,
    fontSize: 8,
  },
  BigUint64Array: {
    fontFamily: typography.primary.Regular,
    fontSize: 15,
  },
  b6: {
    fontFamily: typography.primary.Regular,
    fontSize: 24,
  },
  b7: {
    fontFamily: typography.primary.Regular,
    fontSize: 15,
  },
});
