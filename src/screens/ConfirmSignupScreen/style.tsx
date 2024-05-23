import {StyleSheet} from 'react-native';
import {COLORS, GlobalStyles} from '../../assets';

export const styles = StyleSheet.create({
  renderTextStyle: {
    color: COLORS.primary,
    ...GlobalStyles.b2,
    textDecorationLine: 'underline',
  },

  resendCodeViewstyle: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
});
