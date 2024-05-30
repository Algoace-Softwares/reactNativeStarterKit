import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '../../theme';
// App Imports

export default function Loading(props: loadingType) {
  // destructring props
  const {fullScreen = false} = props;
  return (
    <View style={fullScreen ? styles.mainStyle : null}>
      <ActivityIndicator color={COLORS.palette.primary400} size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
  },
});

interface loadingType {
  fullScreen: boolean;
}
