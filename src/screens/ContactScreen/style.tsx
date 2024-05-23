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
    marginVertical: 0,
    marginTop: 20,
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
    marginTop: 20,
    alignSelf: 'center',
    width: WIDTH * 0.9,
    zIndex: 10,
  },
  buttonTextStyle: {
    color: COLORS.white,
    ...GlobalStyles.l2,
  },
  forgotPassStyle: {...GlobalStyles.b1, color: COLORS.grey2},
  buttonStyle: {alignSelf: 'center', marginTop: 15},
  mainContainer: {flex: 1, backgroundColor: COLORS.white},
  customStyle: {marginTop: 35},
});

export default styles;
