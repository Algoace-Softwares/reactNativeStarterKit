import {StyleSheet} from 'react-native';
import {COLORS, GlobalStyles, HEIGHT, WIDTH} from '../../theme';

const styles = StyleSheet.create({
  appLableStyle: {
    ...GlobalStyles.h2,
    color: COLORS.background,
  },
  appLogoImageStyle: {
    height: HEIGHT * 0.1,
    width: WIDTH * 0.3,
  },
  appLogoView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    position: 'absolute',
    top: 100,
    width: '100%',
  },
  btnContainer: {
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
  },
});

export default styles;
