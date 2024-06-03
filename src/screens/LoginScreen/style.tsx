import {StyleSheet} from 'react-native';
import {COLORS, GlobalStyles} from '../../theme';

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,

    width: 150,
  },
  buttonTextStyle: {
    color: COLORS.buttonTextPrimary,
    ...GlobalStyles.l2,
  },
  forgotPassStyle: {...GlobalStyles.b1, color: COLORS.textDim},
});

export default styles;
