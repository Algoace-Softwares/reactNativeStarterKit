import {View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  AuthHeader,
  BackButton,
  FocusAwareStatusBar,
  InputTextLabel,
} from '../../components';
import {LABELS} from '../../labels';
import {GlobalStyles, COLORS} from '../../assets';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {useAppNavigation} from '../../hooks/useAppNavigation';

export default function ForgotPasswordScreen(): JSX.Element {
  // States
  const [emailAddress, setEmailAddres] = useState<string>('');
  const [loading] = useState<boolean>(false);
  //Hooks
  const navigation = useAppNavigation();

  // Functions
  /*
   ** Checking function validatrion
   */
  const checkTextFieldValidation = (): boolean => {
    if (!emailAddress) {
      Toast.show('email address required', Toast.LONG);

      return false;
    }
    return true;
  };
  /*
   ** Navigation to another screen
   */
  const resetPassPressed = (): void => {
    if (!checkTextFieldValidation()) {
      return;
    }
    const params = {
      emailAddress,
    };
    console.log('resetPassword', params);
    navigation.navigate('ForgotChangePassScreen', {
      email: 'shaheer3.sa@algoace.com',
    });
  };

  // Rendering
  return (
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.onBoardingColor} barStyle={'dark-content'} />
      {/* Main Body */}
      <BackButton fillColor={COLORS.white} />

      {/* Header */}
      <AuthHeader
        text1={LABELS.forgotPasswordBold}
        text2={LABELS.forgotPasswordLable}
        viewStyle={styles.mainView}
      />

      {/* Input field */}
      <InputTextLabel
        textLable={LABELS.emailAddress}
        textInputStyle={styles.textInputStyle}
        viewStyle={styles.InputViewStyle}
        onChangeText={setEmailAddres}
        value={emailAddress}
      />
      {/* Main button */}
      <AppButton
        title={LABELS.resetPassword}
        onPress={resetPassPressed}
        btnStyle={styles.loginButtonStyle}
        textStyle={styles.buttonTextStyle}
        loading={loading}
      />
    </View>
  );
}
