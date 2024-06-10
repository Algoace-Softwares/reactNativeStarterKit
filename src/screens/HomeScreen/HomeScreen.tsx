import {Text, View} from 'react-native';
import React from 'react';
import styles from './style';
import {AppButton} from '../../components';
import {useAppStore} from '../../store';

const HomeScreen = () => {
  /*
   ** Hooks
   */
  const userSignOut = useAppStore(state => state.signOut);
  return (
    <View style={styles.mainView}>
      <Text>HomeScreen</Text>
      <AppButton title={'logout'} onPress={() => userSignOut()} />
    </View>
  );
};

export default HomeScreen;
