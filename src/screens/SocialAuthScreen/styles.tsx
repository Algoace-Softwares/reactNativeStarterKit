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
  facebookButtonStyle: {
    backgroundColor: COLORS.primary,
    marginTop: 23,
    alignSelf: 'center',
    width: WIDTH * 0.9,
  },

  appleButtonStyle: {
    backgroundColor: COLORS.black,
    marginTop: 23,
    alignSelf: 'center',
    width: WIDTH * 0.9,
  },
  goggleButtonStyle: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grey5,
    marginTop: 23,
    alignSelf: 'center',
    width: WIDTH * 0.9,
  },
  buttonTextStyle: {
    color: COLORS.white,
    ...GlobalStyles.l2,
  },
  googleButtonTextStyle: {
    color: COLORS.black,
    ...GlobalStyles.l2,
  },
  forgotPassStyle: {...GlobalStyles.b1, color: COLORS.grey2},
  buttonStyle: {
    alignSelf: 'center',
    marginTop: 15,
    width: 150,
    alignItems: 'center',
  },
  mainContainer: {flex: 1, backgroundColor: COLORS.white},
  upperTextInputStyle: {
    marginTop: 45,
  },
  seperaterLableTextStyle: {
    alignSelf: 'center',
    marginTop: 20,
    ...GlobalStyles.h5,
  },
});

export default styles;
