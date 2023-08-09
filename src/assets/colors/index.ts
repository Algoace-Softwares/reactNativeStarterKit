import {Appearance} from 'react-native';
import DarkColor from './DarkColor';
import LightColor from './LightColor';

// /*
//  ** List of colors that are required throughout the app
//  */
// export const COLORS = {
//   white: '#fff',
//   black: '#000',
//   primary: '#064AAC',
//   primaryLight: '#EAF3FF',
//   grey5: '#787878',
//   grey2: '#4F4F4F',
//   grey3: '#E0E0E0',
//   grey4: '#D0D0D0',
//   grey6: '#1D1D1D',
//   seconday: '#B1B1B1',
//   grey: '#F0F0F0',
//   yellow: '#F2C94C',
//   green2: '#27AE60',
//   grey10: '#282828',
//   grey12: '#828282',
//   green: '#E0FFEF',
//   grey1: '#F9F9F9',
//   green3: '#219653',
//   red: '#EB5757',
//   skin: '#F8F5F0',
//   onBoardingColor: '#E0E2E7',
//   PrimaryOpacity: 'rgba(6, 74, 172, 0.1)',
//   profileStatusColor: '#EAF3FF',
//   grey11: '#FAFAFA',
//   grey13: '#505050',
//   splashScreenColor: '#D4E6F2',
//   greenBadgeColor: '#45F07C',
// };
/*
 ** checking for app theme
 */
const getCurrentThemeColors = () => {
  const currentTheme = Appearance.getColorScheme();
  return currentTheme === 'dark' ? DarkColor : LightColor;
};

export default getCurrentThemeColors();
