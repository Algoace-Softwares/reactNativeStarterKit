import {StyleSheet, Text, View, TouchableOpacity, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles, COLORS, ICONS, WIDTH} from '../../assets';
import DatePickerModal from '../modals/DatePickerModal';

interface InputDatePickerType {
  textLable: string;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  onPressDate: (data: Date) => void;
  calenderIcon?: boolean;
  placeHolder?: string;
  value: Date;
}

export default function InputDatePicker(props: InputDatePickerType): JSX.Element {
  /*
   ** Props
   */
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
  /*
   ** States
   */
  const [datePickerModal, setDatePickerModal] = useState(false);

  // redering date for display / formatting date for to display
  const renderDateToDisplay = (): JSX.Element => {
    if (value) {
      const tempDate = new Date(value);
      return <Text style={styles.selectDateLabelStyle}>{tempDate.toLocaleDateString('en-US')}</Text>;
    } else {
      return <Text style={styles.selectDateLabelStyle}>{placeHolder}</Text>;
    }
  };
  return (
    <TouchableOpacity style={[styles.mainContStyle, viewStyle]} onPress={() => setDatePickerModal(true)}>
      <Text style={[styles.upperTextStyle, textLabelStyle]}>{textLable}</Text>
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
  mainContStyle: {
    alignSelf: 'center',
    marginTop: 15,
    width: WIDTH - 40,
  },
  selectDateLabelStyle: {
    color: COLORS.grey5,
    ...GlobalStyles.l2,
    marginLeft: 10,
  },
  upperTextStyle: {
    color: COLORS.seconday,
    ...GlobalStyles.b1,
  },
});
