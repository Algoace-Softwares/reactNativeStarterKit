import {StyleSheet} from 'react-native';
import {COLORS, WIDTH, GlobalStyles} from '../../assets';

const styles = StyleSheet.create({
  mainView: {
    marginVertical: 30,
    marginLeft: 21,
  },
  textInputStyle: {
    height: 45,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey4,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  InputViewStyle: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  loginButtonStyle: {
    backgroundColor: COLORS.primary,
    marginTop: 35,
    alignSelf: 'center',
    width: WIDTH * 0.9,
  },
  buttonTextStyle: {
    color: COLORS.white,
    ...GlobalStyles.l2,
  },
  renderTextStyle: {
    color: COLORS.primary,
    ...GlobalStyles.b2,
    textDecorationLine: 'underline',
  },
  resendViewStyle: {
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
});

export default styles;
