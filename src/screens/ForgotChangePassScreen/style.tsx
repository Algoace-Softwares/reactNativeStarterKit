import {StyleSheet} from 'react-native';
import {COLORS, GlobalStyles} from '../../theme';

const styles = StyleSheet.create({
  mainView: {
    marginLeft: 21,
    marginVertical: 30,
  },
  renderTextStyle: {
    color: COLORS.textDim,
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
