import {StyleSheet} from 'react-native';
import {COLORS, GlobalStyles} from '../../assets';

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    width: 150,
  },
  forgotPassStyle: {...GlobalStyles.b1, color: COLORS.seconday},
  mainView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
