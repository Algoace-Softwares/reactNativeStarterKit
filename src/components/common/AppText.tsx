import React from 'react';
import type {TextProps, TextStyle, Text} from 'react-native';
import {TxKeyPath} from '../../i18n/types';

interface Props extends TextProps {
  tx?: TxKeyPath;
  style: TextStyle;
}

export const AppText = ({style, tx, children, ...props}: Props) => {
  return (
    <Text style={style} {...props}>
      {tx ? translate(tx) : children}
    </Text>
  );
};
