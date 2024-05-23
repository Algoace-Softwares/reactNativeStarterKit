import {StyleSheet} from 'react-native';
import {COLORS, GlobalStyles} from '../../assets';

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,

    width: 150,
  },
  buttonTextStyle: {
    color: COLORS.white,
    ...GlobalStyles.l2,
  },
  forgotPassStyle: {...GlobalStyles.b1, color: COLORS.seconday},
});

export default styles;
