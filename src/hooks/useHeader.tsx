import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

/**
 * A hook to set the header for a screen.
 */
export function useHeader() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <></>,
    });
  }, [navigation]);
}
