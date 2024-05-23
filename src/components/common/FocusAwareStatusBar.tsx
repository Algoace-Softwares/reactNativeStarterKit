import {StatusBar, StatusBarStyle} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';

export default function FocusAwareStatusBar(props: FocusAwareStatusBarType): JSX.Element | null {
  /*
   ** Props
   */
  const {barStyle = 'default', backgroundColor = ''} = props;
  /*
   ** Hooks
   */
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} /> : null;
}

interface FocusAwareStatusBarType {
  barStyle?: StatusBarStyle;
  backgroundColor: string;
}
