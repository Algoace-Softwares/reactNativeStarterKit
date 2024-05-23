import {StyleSheet} from 'react-native';
import {COLORS, GlobalStyles} from '../../assets';

const styles = StyleSheet.create({
  mainView: {
    marginLeft: 21,
    marginVertical: 30,
  },
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

export default styles;
