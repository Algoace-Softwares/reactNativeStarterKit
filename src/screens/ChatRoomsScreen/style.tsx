import {StyleSheet} from 'react-native';
import {Globaltypography} from '../../theme';

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    width: 150,
  },
  flatListContStyle: {
    paddingTop: 20,
  },
  listContainer: {
    paddingVertical: 10,
  },
  mainView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  notFoundLableStyling: {
    alignSelf: 'center',
    ...Globaltypography.subHeading,
  },
});

export default styles;
