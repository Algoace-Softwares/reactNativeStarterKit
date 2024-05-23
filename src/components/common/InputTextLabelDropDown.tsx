import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import React, {useState} from 'react';
import {LABELS} from '../../labels';
import {GlobalStyles, COLORS, HEIGHT, ICONS} from '../../assets';

type dataItem = {
  id: number;
  title: string;
};
interface InputTextLabelDropDownType {
  textLable: string;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  editable?: boolean;
  viewStyle?: ViewStyle;
  onChangeText: (text: string) => void;
  keyType?: KeyboardTypeOptions;
  placeHolder?: string;
  value?: string | undefined;
  disableAutoCapitalize?: boolean;
  dropDownData: dataItem[];
  dropDown: boolean;
}

export default function InputTextLabelDropDown(props: InputTextLabelDropDownType): JSX.Element {
  // destructring props
  const {
    textLable = '',
    textInputStyle = {},
    textLabelStyle = {},
    editable = true,
    viewStyle = {},
    onChangeText,
    keyType = 'default',
    placeHolder = '',
    value = '',
    dropDown = false,
    dropDownData = [],
    disableAutoCapitalize = false,
  } = props;

  //states
  const [itemData, setItemData] = useState(dropDownData);
  const [isDropDown, setIsDropDown] = useState(false);

  // everythi,e when user type fillter condition execute to filte data
  const onChangeTextDropDown = (e: string): void => {
    onChangeText(e);
    setItemData(dropDownData.filter(item => item.title?.toLowerCase()?.includes(e?.toLowerCase())));
  };

  // rendering breederlist in drop down view
  const renderBreederList = ({item}: {item: dataItem}): JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.renderItemStyle}
        onPress={() => {
          onChangeText(item?.title);
          setIsDropDown(false);
        }}>
        <Text style={styles.renderItemTextStyle}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  // redering drop down view if data is there if not it will return list is empty
  const renderDropDownView = (): JSX.Element => {
    if (!isDropDown) {
      return <></>;
    }
    if (dropDownData.length === 0) {
      return (
        <View style={styles.dropDownViewStyle}>
          <Text style={styles.renderItemTextStyle}>{LABELS.listIsEmpty}</Text>
        </View>
      );
    }
    if (isDropDown && dropDownData?.length > 0) {
      return (
        <View style={styles.dropDownViewStyle}>
          <FlatList
            data={itemData}
            keyExtractor={(item, index) => `index-${index}`}
            showsVerticalScrollIndicator={true}
            renderItem={renderBreederList}
          />
        </View>
      );
    }
    return <></>;
  };
  return (
    <View style={viewStyle}>
      <Text style={[GlobalStyles.b1, styles.upperTextStyle, textLabelStyle]}>{textLable}</Text>
      <View style={[styles.inputStyle2, textInputStyle]}>
        <TextInput
          style={styles.textInput2}
          editable={editable}
          keyboardType={keyType}
          onFocus={() => setIsDropDown(true)}
          placeholderTextColor={'rgba(137, 137, 137, 1)'}
          placeholder={placeHolder}
          value={value}
          onChangeText={text => {
            if (dropDownData) {
              onChangeTextDropDown(text);
            } else {
              onChangeText(text);
            }
          }}
          autoCapitalize={disableAutoCapitalize ? 'none' : 'sentences'}
          autoCorrect={false}
        />
        {/* rendering drop down icon */}

        <TouchableOpacity
          style={styles.rightButtonStyle}
          onPress={() => {
            setIsDropDown(!isDropDown);
          }}>
          {isDropDown ? <ICONS.DropUpIcon /> : <ICONS.DropDownIcon />}
        </TouchableOpacity>
      </View>
      {/* rendering drop down view */}
      {dropDown ? renderDropDownView() : null}
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
});
