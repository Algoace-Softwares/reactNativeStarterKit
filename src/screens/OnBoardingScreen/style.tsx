import {StyleSheet} from 'react-native';
import {COLORS, GlobalStyles} from '../../assets';

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 60,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  appLableStyle: {
    ...GlobalStyles.h2,
    color: COLORS.grey5,
  },
  appLogoView: {
    alignSelf: 'center',
    marginTop: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
  },
  appLogoImageStyle: {
    width: 81,
    height: 83,
  },
});

export default styles;
