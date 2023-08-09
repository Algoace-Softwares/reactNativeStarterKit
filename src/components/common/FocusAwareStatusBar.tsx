import {StatusBar, StatusBarStyle} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';

export default function FocusAwareStatusBar({
  barStyle = 'default',
  backgroundColor = '',
}: {
  barStyle?: StatusBarStyle;
  backgroundColor: string;
}): JSX.Element | null {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
  ) : null;
}
