import {StyleSheet} from 'react-native';
import {COLORS, WIDTH, GlobalStyles} from '../../assets';

const styles = StyleSheet.create({
  mainViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: COLORS.grey5,
  },
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
  forgotPassStyle: {...GlobalStyles.b1, color: COLORS.grey2},
  buttonStyle: {alignSelf: 'center', marginTop: 15},
  mainContainer: {flex: 1, backgroundColor: COLORS.white},
  eyeOnStyle: {tintColor: COLORS.grey4, width: 24, height: 24},
  codeFieldRoot: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.grey2,
    textAlign: 'center',
    color: COLORS.black,
  },
  resendCodeViewstyle: {
    marginTop: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  renderTextStyle: {
    color: COLORS.primary,
    ...GlobalStyles.b2,
    textDecorationLine: 'underline',
  },
});

export default styles;
