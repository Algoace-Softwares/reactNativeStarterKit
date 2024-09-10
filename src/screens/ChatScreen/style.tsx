import {StyleSheet} from 'react-native';
import {COLORS, HEIGHT, SPACING} from '../../theme';

const styles = StyleSheet.create({
  actionsStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
    marginTop: SPACING.xs,
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    width: 150,
  },
  composerStyle: {
    backgroundColor: COLORS.header,
    borderColor: COLORS.border,
    borderRadius: 6,
    borderWidth: 0.5,
    paddingHorizontal: 12,
  },
  inputToolBarStyle: {
    height: HEIGHT * 0.1,
    maxHeight: 100,
  },
  mainContainer: {
    flex: 1,
  },
  mainView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  sendBtnStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    height: 45,
    justifyContent: 'center',
    marginHorizontal: SPACING.xs,
    width: 44,
  },
});

export default styles;
