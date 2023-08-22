import {StyleSheet, Text, View, TextInput, TouchableOpacity, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles, COLORS, HEIGHT} from '../../assets';
import {countriesData} from '../../data';

export type countriesDataItem = {
  countryName: string;
  countryDialCode: string;
  emoji?: string;
  code: string;
};

interface InputTextPhoneNumber {
  textLable: string;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  onChangeText: (text: string) => void;
  value?: string;
}

export default function InputTextPhoneNumber(props: InputTextPhoneNumber): JSX.Element {
  // destructring props
  const {textLable, textInputStyle, textLabelStyle, viewStyle, onChangeText, value = '+93'} = props;
  /*
   **States
   */
  const [detectedCountry, setDetectedCountry] = useState<countriesDataItem | undefined>(
    countriesData[0],
  );

  /*
   **everytime when user type fillter condition execute to filte data
   */
  const onChangeTextDropDown = (num: string): void => {
    if (num?.length < 6) {
      const tempData = countriesData.find(item => {
        if (num?.includes(item?.countryDialCode)) {
          return item;
        }
      });
      setDetectedCountry(tempData);
    }
  };

  return (
    <View style={viewStyle}>
      <Text style={[GlobalStyles.b1, styles.upperTextStyle, textLabelStyle]}>{textLable}</Text>
      <View style={[styles.inputStyle2, textInputStyle]}>
        <TouchableOpacity style={styles.leftButtonStyle}>
          {detectedCountry?.emoji && (
            <Text style={styles.flagEmojiStyle}>{`${detectedCountry?.emoji}`}</Text>
          )}
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
    paddingLeft: 10,
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
  leftButtonStyle: {
    marginRight: 10,
    height: '100%',
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownViewStyle: {
    width: '100%',
    height: HEIGHT * 0.24,
    backgroundColor: COLORS.white,
    // position: 'absolute',
    // top: 70,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    borderTopWidth: 0,
    marginTop: -4,
    paddingBottom: 3,
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
  flagEmojiStyle: {
    fontSize: 35,
  },
});
