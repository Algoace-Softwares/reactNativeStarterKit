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
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: COLORS.white,
    ...GlobalStyles.l2,
  },
  eyeOnStyle: {tintColor: COLORS.grey4, width: 24, height: 24},
  inner: {
    justifyContent: 'flex-end',
  },
  customStyle: {
    marginTop: 45,
  },
});

export default styles;
