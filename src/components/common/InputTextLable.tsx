import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import React from 'react';
import {GlobalStyles, COLORS, HEIGHT} from '../../assets';

interface inputTextLabelType {
  textLable: string;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  editable?: boolean;
  viewStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  rightIconPress?: () => void;
  leftIconPress?: () => void;
  secureEntry?: boolean;
  children?: JSX.Element;
  leftIcon?: boolean;
  rightIcon?: boolean;
  keyType?: KeyboardTypeOptions;
  placeHolder?: string;
  value: string | undefined;
  disableAutoCapitalize?: boolean;
}

export default function InputTextLabel(props: inputTextLabelType): JSX.Element {
  // desrtcurting props
  const {
    textLable = '',
    textInputStyle = {},
    textLabelStyle = {},
    editable = true,
    viewStyle = {},
    onChangeText,
    rightIconPress,
    leftIconPress,
    secureEntry = false,
    children,
    leftIcon = false,
    rightIcon = false,
    keyType = 'default',
    placeHolder = '',
    value = '',
    disableAutoCapitalize = false,
  } = props;
  //states

  return (
    <View style={viewStyle}>
      <Text style={[GlobalStyles.b1, styles.upperTextStyle, textLabelStyle]}>{textLable}</Text>

      <View style={[styles.inputStyle2, textInputStyle]}>
        {leftIcon ? (
          <TouchableOpacity style={styles.leftButtonStyle} onPress={leftIconPress}>
            {Array.isArray(children) ? children[0] : children}
          </TouchableOpacity>
        ) : null}
        <TextInput
          style={[styles.textInput2]}
          editable={editable}
          secureTextEntry={secureEntry}
          keyboardType={keyType}
          placeholderTextColor={'rgba(137, 137, 137, 1)'}
          placeholder={placeHolder}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={disableAutoCapitalize ? 'none' : 'sentences'}
          autoCorrect={false}
        />
        {rightIcon ? (
          <TouchableOpacity style={styles.rightButtonStyle} onPress={rightIconPress}>
            {Array.isArray(children) ? children[1] : children}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  upperTextStyle: {
    color: COLORS.primary,
  },

  inputStyle: {
    height: 45,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  inputViewStyle: {
    height: 45,
    width: '100%',
  },
  inputStyle2: {
    width: '100%',
    height: 45,
    borderWidth: 0.5,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.primary,
    marginTop: 10,
  },
  textInput2: {
    height: '100%',
    width: '95%',
  },
  rightButtonStyle: {
    position: 'absolute',
    right: 10,
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  leftButtonStyle: {marginRight: 10},
  dropDownViewStyle: {
    width: '100%',
    height: HEIGHT * 0.24,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: 70,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    borderTopWidth: 0,
    paddingBottom: 3,
    zIndex: 999,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  renderItemStyle: {
    width: '100%',
    paddingLeft: 15,
    marginVertical: 3,
    height: 30,
  },
  renderItemTextStyle: {
    color: COLORS.grey5,
    ...GlobalStyles.b2,
  },
});
