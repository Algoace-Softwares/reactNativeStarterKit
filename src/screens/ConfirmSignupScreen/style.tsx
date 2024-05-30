import {StyleSheet} from 'react-native';
import {COLORS, GlobalStyles} from '../../theme';

export const styles = StyleSheet.create({
  renderTextStyle: {
    color: COLORS.palette.primary500,
    ...GlobalStyles.b2,
    textDecorationLine: 'underline',
  },

  resendCodeViewstyle: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
});
