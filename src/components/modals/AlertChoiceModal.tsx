import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {COLORS, GlobalStyles} from '../../assets';
import {LABELS} from '../../labels';
import AppButton from '../common/AppButton';

interface alertChoiceModalType {
  visible: boolean;
  setVisible: (data: boolean) => void;
  clickAnywhere?: boolean;
  okBtnPressed: () => void;
  label: string;
  loading?: boolean;
}

export default function AlertChoiceModal({
  visible = false,
  setVisible,
  clickAnywhere = false,
  okBtnPressed,
  label = '',
  loading = false,
}: alertChoiceModalType): JSX.Element {
  // Functions

  // when user press ok btn
  const onPressbtn1 = () => {
    setVisible(false);
  };

  // Rendering
  return (
    <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={() => clickAnywhere && setVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.textLabelStyle}>{label}</Text>
          {/* Main buttons */}
          <View style={styles.btnContainer}>
            <AppButton
              title={LABELS.no}
              onPress={onPressbtn1}
              btnStyle={GlobalStyles.smallBtn1Style}
            />
            <AppButton
              title={LABELS.yes}
              onPress={() => okBtnPressed()}
              btnStyle={GlobalStyles.smallBtn2Style}
              textStyle={GlobalStyles.btn2textStyle}
              loading={loading}
              loadingColor={COLORS.black}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 17,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    backgroundColor: COLORS.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    padding: 16,
  },
  textLabelStyle: {
    color: COLORS.black,
    ...GlobalStyles.l7,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 13,
  },
});
