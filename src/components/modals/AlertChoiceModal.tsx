import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {COLORS, GlobalStyles} from '../../assets';
import AppButton from '../common/AppButton';
import {useTranslation} from 'react-i18next';

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
  /*
   ** Hooks
   */
  const {t} = useTranslation();
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
            <AppButton title={t('no')} onPress={onPressbtn1} btnStyle={GlobalStyles.smallBtn1Style} />
            <AppButton
              title={t('yes')}
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 13,
    width: '100%',
  },
  centeredView: {
    alignItems: 'center',
    backgroundColor: COLORS.black,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 17,
  },

  modalView: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 6,
    justifyContent: 'center',
    padding: 16,
    width: '100%',
  },

  textLabelStyle: {
    color: COLORS.black,
    ...GlobalStyles.l7,
  },
});
