import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {AppButton, AuthHeader, BackButton, FocusAwareStatusBar, InputTextLabel} from '../../components';
import {LABELS} from '../../labels';
import {GlobalStyles, COLORS, SVG} from '../../assets';
import styles from './style';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {appValidation} from '../../utils';

export default function LoginScreen(): JSX.Element {
  /*
   ** States
   */
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading] = useState<boolean>(false);
  /*
   * Hooks
   */
  const navigation = useAppNavigation();
  /*
   * Functions
   */
  /*
   ** Validating data before api call
   */
  const checkTextFieldValidation = () => {
    if (!emailAddress || !password) {
      Toast.show('Input fields required', Toast.LONG);
      return false;
    }
    if (!appValidation.validateLogin(emailAddress)) {
      Toast.show('Please enter valid emailAddress', Toast.LONG);
      return false;
    }
    if (!appValidation.validatePassword(password)) {
      Toast.show('Inavlid password it should on UpperCase, lowerCase, letter and one number', Toast.LONG);
      return false;
    }
    return true;
  };
  /*
   *  Btn press to make user Login
   */
  const appBtnPress = () => {
    if (!checkTextFieldValidation()) {
      return;
    }

    const params = {
      emailAddress: emailAddress?.trim()?.toLowerCase(),
      password: password.trim(),
    };

    console.log('params:', params);
  };
  return (
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.onBoardingColor} barStyle={'dark-content'} />

      {/* Main Body */}
      <BackButton fillColor={COLORS.white} />
      <SVG.Add fill={COLORS.green} width={50} height={50} />

      {/* Header */}
      <AuthHeader text1={LABELS.welcomeBack} text2={LABELS.signInLabel} />

      {/* Input fields */}
      <InputTextLabel textLable={LABELS.email} onChangeText={setEmailAddress} value={emailAddress} />
      <InputTextLabel textLable={LABELS.password} onChangeText={setPassword} value={password} isPassword={true} />

      {/* Button */}
      <AppButton title={LABELS.login} onPress={appBtnPress} textStyle={styles.buttonTextStyle} loading={loading} />

      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPassStyle}>{LABELS.forgotPasswordsmall}</Text>
      </TouchableOpacity>
    </View>
  );
}
