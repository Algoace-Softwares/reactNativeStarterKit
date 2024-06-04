import {StyleSheet} from 'react-native';
import {Colors, Globaltypography} from '../../theme';

const createStyles = (COLORS: Colors) =>
  StyleSheet.create({
    buttonStyle: {
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 15,

      width: 150,
    },

    forgotPassStyle: {...Globaltypography.default, color: COLORS.text},
    mainContainer: {
      backgroundColor: COLORS.background,
      flex: 1,
    },
  });

export default createStyles;
