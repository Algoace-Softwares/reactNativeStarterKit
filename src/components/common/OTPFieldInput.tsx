import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {GlobalStyles, COLORS} from '../../assets';

const CELL_COUNT = 6;

interface oTPFieldInputType {
  textLable: string;
  mainOtpStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  mianViewStyle?: ViewStyle;
  onChangeText: (text: string) => void;
  cellStyle?: ViewStyle;
}

export default function OTPFieldInput(properties: oTPFieldInputType): JSX.Element {
  const {
    textLable = '',
    mainOtpStyle = {},
    textLabelStyle = {},
    mianViewStyle = {},
    onChangeText,
    cellStyle = {},
  } = properties;
  //states
  const [value, setValue] = useState<string>('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  //refs
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  //rendering
  return (
    <View style={[styles.viewStyle, mianViewStyle]}>
      <Text style={[GlobalStyles.b1, styles.upperTextStyle, textLabelStyle]}>{textLable}</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={text => {
          onChangeText(text);
          setValue(text);
        }}
        cellCount={CELL_COUNT}
        rootStyle={[styles.codeFieldRoot, mainOtpStyle]}
        keyboardType={'number-pad'}
        textContentType={'oneTimeCode'}
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, cellStyle, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  upperTextStyle: {
    color: COLORS.primary,
  },
  codeFieldRoot: {
    marginTop: 10,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
    textAlign: 'center',
    color: COLORS.primary,
  },
  focusCell: {
    borderColor: '#000',
  },
});
