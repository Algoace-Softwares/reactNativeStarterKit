import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalStyles, COLORS, HEIGHT, ICONS} from '../../assets';
import {countriesData} from '../../data';
/*
 ** types
 */
export type countriesDataItem = {
  countryName: string;
  countryDialCode: string;
  emoji?: string;
  code: string;
};

interface InputTextLabelCountryType {
  textLable: string;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  onCountrySelect: (data: string) => void;
  placeHolder?: string;
  value?: string;
}

export default function InputTextLabelCountry(props: InputTextLabelCountryType): JSX.Element {
  // destructring props
  const {
    textLable = '',
    textInputStyle = {},
    textLabelStyle = {},
    viewStyle = {},
    onCountrySelect,
    placeHolder = '',
    value = '',
  } = props;
  /*
   ** states
   */
  const [itemData, setItemData] = useState<countriesDataItem[]>(countriesData);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<countriesDataItem>();
  /*
   ** life cycle
   */
  useEffect(() => {
    /*
     **if provided value match then save on our state
     **checking if provided value is inlcuded in our countrires data list
     */
    const valueFound = countriesData?.find(item => {
      if (item.countryName?.toLowerCase() === value?.toLowerCase()) {
        return item;
      }
      return undefined;
    });
    if (valueFound) {
      setSelectedCountry(valueFound);
    }
  }, [value]);

  /*
   ** functions
   */

  // everytime when user type fillter condition execute to filte data
  const onChangeTextDropDown = (e: string): void => {
    setSelectedCountry(prevItem => {
      if (prevItem) {
        return {...prevItem, countryName: e};
      }
      return;
    });
    setItemData(
      countriesData.filter(item => item.countryName?.toLowerCase()?.includes(e?.toLowerCase())),
    );
  };

  // rendering breederlist in drop down view
  const renderBreederList = ({item}: {item: countriesDataItem}): JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.renderItemStyle}
        onPress={() => {
          // onChangeText(item?.countryName);
          onCountrySelect(item?.countryName);
          setSelectedCountry(item);
          setIsDropDown(false);
        }}>
        <Text style={styles.renderItemTextStyle}>{item?.countryName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={viewStyle}>
      <Text style={[GlobalStyles.b1, styles.upperTextStyle, textLabelStyle]}>{textLable}</Text>
      <View style={[styles.inputStyle2, textInputStyle]}>
        <TouchableOpacity
          style={styles.leftButtonStyle}
          onPress={() => {
            setIsDropDown(true);
          }}>
          {selectedCountry?.emoji && (
            <Text style={styles.flagEmojiStyle}>{`${selectedCountry?.emoji}`}</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.textInput2}
          onFocus={() => setIsDropDown(true)}
          placeholderTextColor={'rgba(137, 137, 137, 1)'}
          placeholder={placeHolder}
          value={selectedCountry?.countryName}
          onChangeText={text => {
            onChangeTextDropDown(text);
          }}
        />
        {/* rendering drop down icon */}

        <TouchableOpacity
          style={styles.rightButtonStyle}
          onPress={() => {
            setIsDropDown(!isDropDown);
          }}>
          {isDropDown ? <ICONS.DropUpIcon /> : <ICONS.DropDownIcon />}
        </TouchableOpacity>

        {/* rendering drop down view */}
      </View>
      {isDropDown ? (
        <View style={styles.dropDownViewStyle}>
          <FlatList
            data={itemData}
            keyExtractor={(item, index) => `index-${index}`}
            showsVerticalScrollIndicator={true}
            renderItem={renderBreederList}
          />
        </View>
      ) : null}
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
  leftButtonStyle: {marginRight: 10},
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
