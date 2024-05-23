import {Appearance} from 'react-native';
import DarkColor from './DarkColor';
import LightColor from './LightColor';

/*
 ** List of colors that are required throughout the app
 */

/*
 ** checking for app theme
 */
const getCurrentThemeColors = () => {
  const currentTheme = Appearance.getColorScheme();
  return currentTheme === 'dark' ? DarkColor : LightColor;
};

export default getCurrentThemeColors();
