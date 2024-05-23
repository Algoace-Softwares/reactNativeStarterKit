import {StyleSheet, Text, View, TouchableOpacity, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles, COLORS, HEIGHT, ICONS} from '../../assets';
import DatePickerModal from '../modals/DatePickerModal';

interface InputDatePicker {
  textLable: string;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  onPressDate: (data: Date) => void;
  calenderIcon?: boolean;
  placeHolder?: string;
  value: Date;
}

export default function InputDatePicker(props: InputDatePicker): JSX.Element {
  // destructruing props
  const {
    textLable = '',
    textInputStyle = {},
    textLabelStyle = {},
    viewStyle = {},
    onPressDate,
    calenderIcon = false,
    placeHolder = 'Select date',
    value = new Date(),
  } = props;
  //states
  const [datePickerModal, setDatePickerModal] = useState(false);

  // redering date for display / formatting date for to display
  const renderDateToDisplay = (): JSX.Element => {
    if (value) {
      const tempDate = new Date(value);
      return (
        <Text style={styles.selectDateLabelStyle}>{tempDate.toLocaleDateString('en-US')}</Text>
      );
    } else {
      return <Text style={styles.selectDateLabelStyle}>{placeHolder}</Text>;
    }
  };
  return (
    <TouchableOpacity style={viewStyle} onPress={() => setDatePickerModal(true)}>
      <Text style={[GlobalStyles.b1, styles.upperTextStyle, textLabelStyle]}>{textLable}</Text>
      <View style={[styles.inputStyle2, textInputStyle]}>
        {renderDateToDisplay()}
        {calenderIcon && <ICONS.CalenderIcon />}
      </View>
      <DatePickerModal
        visible={datePickerModal}
        setVisible={setDatePickerModal}
        onSelectedDate={(date: Date) => onPressDate(date)}
        value={value}
      />
    </TouchableOpacity>
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
  selectDateLabelStyle: {
    color: COLORS.grey5,
    ...GlobalStyles.l2,
  },
});
