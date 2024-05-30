import {StyleSheet} from 'react-native';
import {COLORS, WIDTH} from '../../theme';

const styles = StyleSheet.create({
  loginButtonStyle: {
    alignSelf: 'center',
    backgroundColor: COLORS.button,
    marginBottom: 20,
    marginTop: 35,
    width: WIDTH * 0.9,
  },
  mainContainer2: {
    justifyContent: 'flex-end',
  },
});

export default styles;
