import {StyleSheet} from 'react-native';
import {Colors, Globaltypography, HEIGHT, WIDTH} from '../../theme';

const createStyles = (COLORS: Colors) =>
  StyleSheet.create({
    appLableStyle: {
      ...Globaltypography.Heading,
      color: COLORS.background,
    },
    appLogoImageStyle: {
      height: HEIGHT * 0.1,
      width: WIDTH * 0.3,
    },
    appLogoView: {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 50,
      position: 'absolute',
      top: 100,
      width: '100%',
    },
    btnContainer: {
      bottom: 60,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
      position: 'absolute',
      width: '100%',
    },
    mainContainer: {
      backgroundColor: COLORS.background,
      flex: 1,
    },
    smallBtn2: {
      backgroundColor: COLORS.background,
    },
    smallBtn2Text: {
      color: COLORS.buttonTextSeconday,
    },
  });

export default createStyles;
