import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
// App Imports
import {COLORS} from '../../assets';

export default function Loading({fullScreen = false}: {fullScreen: boolean}) {
  return (
    <View style={[fullScreen && styles.mainStyle]}>
      <ActivityIndicator color={COLORS.primary} size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
