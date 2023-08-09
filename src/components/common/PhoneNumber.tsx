import {Text, View} from 'react-native';
import React from 'react';
import {COLORS, GlobalStyles} from '../../assets';

export default function PhoneNumber({code}: {code: number}) {
  return (
    <View>
      <Text
        style={{color: COLORS.grey5, ...GlobalStyles.l3}}>{`+${code}`}</Text>
    </View>
  );
}
