import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../colors';
import {FONTS} from '../fonts';

export const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');
/*
 ** List of style that are required throughout the app
 */
export const GlobalStyles = StyleSheet.create({
  /*
   ** Global styles
   */
  btn2textStyle: {
    color: COLORS.grey5,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  mainImageStyle: {
    height: '100%',
    width: '100%',
  },
  smallBtn1Style: {
    backgroundColor: COLORS.primary,
    height: 45,
    width: WIDTH * 0.4,
  },
  smallBtn2Style: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    height: 45,
    width: WIDTH * 0.4,
  },
  /*
   ** Fonts styles
   */
  // eslint-disable-next-line react-native/sort-styles
  h1: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 30,
  },
  h2: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 24,
  },
  h3: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 14,
  },
  h4: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 36,
  },
  h5: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 18,
  },
  // labelfont style
  l1: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 14,
  },
  l2: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 14,
  },
  l3: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 16,
  },
  l4: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 16,
  },
  l5: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 13,
  },
  l6: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 12,
  },
  l7: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 16,
  },
  l8: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 18,
  },
  l9: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 12,
    lineHeight: 16,
  },
  // body font style
  b1: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 14,
  },
  b2: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 14,
  },
  b3: {
    fontFamily: FONTS.poppinsLight,
    fontSize: 14,
  },
  b4: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 12,
  },
  b5: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 8,
  },
  BigUint64Array: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 15,
  },
  b6: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 24,
  },
  b7: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 15,
  },
});
