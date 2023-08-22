import {StatusBar, StatusBarStyle} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';

export default function FocusAwareStatusBar(props: FocusAwareStatusBarType): JSX.Element | null {
  //destructuring props
  const {barStyle = 'default', backgroundColor = ''} = props;
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} /> : null;
}

interface FocusAwareStatusBarType {
  barStyle?: StatusBarStyle;
  backgroundColor: string;
}
