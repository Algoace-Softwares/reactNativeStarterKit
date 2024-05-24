import {StyleSheet, Text, View, TextInput, TouchableOpacity, ViewStyle, KeyboardTypeOptions} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles, COLORS, WIDTH, SVG} from '../../assets';

interface inputTextLabelType {
  textLable: string;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  editable?: boolean;
  viewStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  rightIconPress?: () => void;
  leftIconPress?: () => void;
  children?: JSX.Element;
  leftIcon?: boolean;
  rightIcon?: boolean;
  keyType?: KeyboardTypeOptions;
  placeHolder?: string;
  value: string | undefined;
  disableAutoCapitalize?: boolean;
  isPassword?: boolean;
}

export default function InputTextLabel(props: inputTextLabelType): JSX.Element {
  /*
   ** Props
   */
  const {
    textLable = '',
    textInputStyle = {},
    textLabelStyle = {},
    editable = true,
    viewStyle = {},
    onChangeText,
    rightIconPress,
    leftIconPress,
    children,
    leftIcon = false,
    rightIcon = false,
    keyType = 'default',
    placeHolder = '',
    value = '',
    disableAutoCapitalize = false,
    isPassword = false,
  } = props;
  /*
   ** States
   */
  const [passSecure, setPassSecure] = useState<boolean>(true);

  return (
    <View style={[styles.mainContStyle, viewStyle]}>
      <Text style={[GlobalStyles.b1, styles.upperTextStyle, textLabelStyle]}>{textLable}</Text>

      <View style={[styles.inputStyle2, textInputStyle]}>
        {leftIcon ? (
          <TouchableOpacity style={styles.leftButtonStyle} onPress={leftIconPress}>
            {Array.isArray(children) ? children[0] : children}
          </TouchableOpacity>
        ) : null}
        <TextInput
          style={styles.textInput2}
          editable={editable}
          secureTextEntry={isPassword ? passSecure : false}
          keyboardType={keyType}
          placeholderTextColor={'rgba(137, 137, 137, 1)'}
          placeholder={placeHolder}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={disableAutoCapitalize ? 'none' : 'sentences'}
          autoCorrect={false}
        />
        {isPassword && (
          <TouchableOpacity style={styles.rightButtonStyle} onPress={() => setPassSecure(!passSecure)}>
            {passSecure ? <SVG.EyeOffIcon fill={COLORS.grey5} /> : <SVG.EyeOnIcon fill={COLORS.grey5} />}
          </TouchableOpacity>
        )}
        {rightIcon && !isPassword ? (
          <TouchableOpacity style={styles.rightButtonStyle} onPress={rightIconPress}>
            {Array.isArray(children) ? children[1] : children}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle2: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.grey4,
    borderRadius: 6,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 45,
    marginTop: 10,
    width: '100%',
  },
  leftButtonStyle: {marginRight: 10},
  mainContStyle: {
    alignSelf: 'center',
    marginTop: 15,
    width: WIDTH - 40,
  },

  rightButtonStyle: {
    alignItems: 'flex-end',
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    width: 50,
  },

  textInput2: {
    height: '100%',
    paddingLeft: 10,
    width: '95%',
  },

  upperTextStyle: {
    color: COLORS.seconday,
  },
});
