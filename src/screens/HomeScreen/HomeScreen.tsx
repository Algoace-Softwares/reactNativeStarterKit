import {Text, View} from 'react-native';
import React from 'react';
import styles from './style';
import {AppButton} from '../../components';
import {useAppNavigation} from '../../hooks/useAppNavigation';

const HomeScreen = () => {
  /*
   * Hooks
   */
  const navigation = useAppNavigation();

  /*
   ** Lifecycle methods
   */

  return (
    <View style={styles.mainView}>
      <Text>HomeScreen</Text>
      <AppButton
        title={'chatRoomsScreen'}
        onPress={() => {
          navigation.navigate('ChatRoomsScreen');
        }}
      />
    </View>
  );
};

export default HomeScreen;
