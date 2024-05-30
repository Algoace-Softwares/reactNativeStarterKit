import {StyleSheet, Text, View, TextInput, TouchableOpacity, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {countriesData} from '../../data';
import {COLORS, GlobalStyles} from '../../theme';

export type countriesDataItem = {
  countryName: string;
  countryDialCode: string;
  emoji?: string;
  code: string;
};

interface InputTextPhoneNumberType {
  textLable: string;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  onChangeText: (text: string) => void;
  value?: string;
}

export default function InputTextPhoneNumber(props: InputTextPhoneNumberType): JSX.Element {
  /*
   ** Destructring props
   */
  const {textLable, textInputStyle, textLabelStyle, viewStyle, onChangeText, value = '+93'} = props;
  /*
   **States
   */
  const [detectedCountry, setDetectedCountry] = useState<countriesDataItem | undefined>(countriesData[0]);

  /*
   **everytime when user type fillter condition execute to filte data
   */
  const onChangeTextDropDown = (num: string): void => {
    if (num?.length < 6) {
      const tempData = countriesData.find(item => {
        if (num?.includes(item?.countryDialCode)) {
          return item;
        }
        return;
      });
      setDetectedCountry(tempData);
    }
  };

  return (
    <View style={viewStyle}>
      <Text style={[GlobalStyles.b1, styles.upperTextStyle, textLabelStyle]}>{textLable}</Text>
      <View style={[styles.inputStyle2, textInputStyle]}>
        <TouchableOpacity style={styles.leftButtonStyle}>
          {detectedCountry?.emoji && <Text style={styles.flagEmojiStyle}>{`${detectedCountry?.emoji}`}</Text>}
        </TouchableOpacity>

        <TextInput
          style={styles.textInput2}
          placeholderTextColor={'rgba(137, 137, 137, 1)'}
          placeholder={detectedCountry?.countryDialCode}
          value={value}
          onChangeText={text => {
            console.log('onChangeText:', text);
            onChangeTextDropDown(text);
            onChangeText(text);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flagEmojiStyle: {
    fontSize: 35,
  },
  inputStyle2: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.border,
    borderRadius: 6,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 45,
    marginTop: 10,
    paddingLeft: 10,
    width: '100%',
  },
  leftButtonStyle: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    marginRight: 10,
    width: 30,
  },
  textInput2: {
    height: '100%',
    width: '95%',
  },

  upperTextStyle: {
    color: COLORS.text,
  },
});
