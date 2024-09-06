import {StyleSheet} from 'react-native';
import {Globaltypography} from '../../theme';

const styles = StyleSheet.create({
  flatListContStyle: {
    paddingTop: 20,
  },
  notFoundLableStyling: {
    alignSelf: 'center',
    ...Globaltypography.subHeading,
  },
});

export default styles;
