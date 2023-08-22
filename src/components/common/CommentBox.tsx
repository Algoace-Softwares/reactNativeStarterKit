import {StyleSheet, Text, View, TextInput, ViewStyle} from 'react-native';
import React from 'react';
import {GlobalStyles, COLORS} from '../../assets';

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
        placeholderTextColor={COLORS.grey4}
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
  upperTextStyle: {
    color: COLORS.grey2,
  },

  inputStyle: {
    height: 45,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey4,
    paddingHorizontal: 10,
    marginTop: 10,
  },

  inputViewStyle: {
    height: 45,
    width: '100%',
  },
  inputStyle2: {
    width: '100%',
    // backgroundColor: 'red',
    height: 45,
    borderWidth: 0.5,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    alignSelf: 'center',
    borderColor: COLORS.grey4,
    marginTop: 10,
  },
  textInput2: {
    height: 110,
    width: '80%',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: COLORS.grey4,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    color: COLORS.black,
  },
  rightButtonStyle: {position: 'absolute', right: 20},
  leftButtonStyle: {marginRight: 10},
  textLabel2Style: {
    ...GlobalStyles.b4,
    color: COLORS.grey6,
  },
});
