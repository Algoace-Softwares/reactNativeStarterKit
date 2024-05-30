import {StyleSheet, Text, View, TextInput, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS, GlobalStyles} from '../../theme';

interface commentBoxType {
  textLable: string;
  textLable2?: string;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  viewStyle: ViewStyle;
  onChangeText: (text: string) => void;
  placeHolder: string;
  value: string | undefined;
}

export default function CommentBox(props: commentBoxType): JSX.Element {
  // destuctruing props
  const {
    textLable = '',
    textLable2 = '',
    textInputStyle = {},
    textLabelStyle = {},
    viewStyle = {},
    onChangeText,
    placeHolder = '',
    value,
  } = props;
  // Rerendering
  return (
    <View style={viewStyle}>
      <Text style={[GlobalStyles.b2, textLabelStyle]}>
        {textLable}
        <Text style={styles.textLabel2Style}>{textLable2}</Text>
      </Text>
      <TextInput
        style={[styles.textInput2, textInputStyle]}
        scrollEnabled={false}
        placeholderTextColor={COLORS.textDim}
        textAlignVertical={'top'}
        blurOnSubmit={true}
        multiline
        onSubmitEditing={() => {
          console.debug('finised.....');
        }}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput2: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderRadius: 6,
    borderWidth: 0.5,
    color: COLORS.palette.black,
    height: 110,
    paddingHorizontal: 10,
    width: '80%',
  },

  textLabel2Style: {
    ...GlobalStyles.b4,
    color: COLORS.text,
  },
});
