import {StyleSheet, Text, View, Modal, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles, HEIGHT, COLORS} from '../../assets';
import {LABELS} from '../../labels';
import DatePicker from 'react-native-date-picker';

interface datePickerModalType {
  visible: boolean;
  setVisible: (data: boolean) => void;
  clickAnywhere?: boolean;
  onSelectedDate: (data: Date) => void;
  value: Date;
}

export default function DatePickerModal({
  visible = false,
  setVisible,
  clickAnywhere = false,
  onSelectedDate,
  value = new Date(),
}: datePickerModalType): JSX.Element {
  //states
  const [androidDate, setAndroidDate] = useState<Date>(new Date());

  //functions

  //refactory date getting day, month and yaer from that date
  const refactorDate = (selectedDate: Date) => {
    onSelectedDate(selectedDate);
    setVisible(false);
  };

  //Rendering
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={() => clickAnywhere && setVisible(false)}>
        <View style={styles.modalView}>
          {/* header start */}
          <View style={styles.iPhoneStyle} />
          <View style={styles.titleViewStyle}>
            <TouchableOpacity onPress={() => refactorDate(androidDate)}>
              <Text style={styles.title1Style}>{LABELS.selectDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.title2Style}>{LABELS.cancel}</Text>
            </TouchableOpacity>
          </View>
          {Platform.OS === 'android' ? (
            <DatePicker
              open={visible}
              androidVariant={'iosClone'}
              date={androidDate}
              mode={'date'}
              minimumDate={new Date()}
              onDateChange={setAndroidDate}
            />
          ) : (
            <DatePicker
              modal
              open={visible}
              date={value}
              minimumDate={new Date()}
              mode={'date'}
              onConfirm={refactorDate}
              onCancel={() => setVisible(false)}
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: HEIGHT * 0.35,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: COLORS.grey4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title2Style: {
    color: COLORS.grey6,
    fontWeight: 'bold',

    ...GlobalStyles.l1,
  },
  title1Style: {
    color: COLORS.green2,
    fontWeight: 'bold',
    ...GlobalStyles.h5,
  },

  iPhoneStyle: {
    position: 'absolute',
    alignSelf: 'center',
    top: 10,
    backgroundColor: COLORS.grey3,
    height: 5,
    width: 85,
    borderRadius: 2.5,
  },
  titleViewStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
});
