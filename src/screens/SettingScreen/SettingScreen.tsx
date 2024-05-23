import {Text, View} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../../assets';
import styles from './styles';

const SettingScreen = () => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <Text style={styles.lableStyle}>SettingScreen</Text>
    </View>
  );
};

export default SettingScreen;
