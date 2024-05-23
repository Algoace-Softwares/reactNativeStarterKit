import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {
  AppButton,
  AuthHeader,
  BackButton,
  FocusAwareStatusBar,
  InputTextLabel,
} from '../../components';
import {LABELS} from '../../labels';
import {GlobalStyles, COLORS, ICONS} from '../../assets';
import styles from './style';
import Toast from 'react-native-simple-toast';
import {AppValidation} from '../../utils/Validations';
import {useAppNavigation} from '../../hooks/useAppNavigation';

const appValidation = new AppValidation();

export default function LoginScreen(): JSX.Element {
  /* *
  States
   */
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passSecure, setPassSecure] = useState<boolean>(true);
  const [loading] = useState<boolean>(false);
  /*
   * hooks
   */
  const navigation = useAppNavigation();

  /*
   * Functions
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
      Toast.show(
        'Inavlid password it should on UpperCase, lowerCase, letter and one number',
        Toast.LONG,
      );
      return false;
    }
    return true;
  };

  /*
   *  btn press to make user login
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
  // Rendering
  return (
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.onBoardingColor} barStyle={'dark-content'} />
      {/* Main Body */}
      <BackButton fillColor={COLORS.white} />
      {/* Header */}
      <AuthHeader
        text1={LABELS.welcomeBack}
        text2={LABELS.signInLabel}
        viewStyle={styles.mainView}
      />
      {/* Input fields */}
      <InputTextLabel
        textLable={LABELS.email}
        textInputStyle={styles.textInputStyle}
        viewStyle={styles.InputViewStyle}
        onChangeText={setEmailAddress}
        value={emailAddress}
      />
      <InputTextLabel
        textLable={LABELS.password}
        textInputStyle={styles.textInputStyle}
        viewStyle={styles.InputViewStyle}
        onChangeText={setPassword}
        secureEntry={passSecure}
        value={password}
        rightIcon={true}>
        {passSecure ? (
          <TouchableOpacity onPress={() => setPassSecure(!passSecure)}>
            <ICONS.EyeOffIcon color={COLORS.grey4} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setPassSecure(!passSecure)}>
            <ICONS.EyeOnIcon color={COLORS.grey4} />
          </TouchableOpacity>
        )}
      </InputTextLabel>
      {/* Button */}
      <AppButton
        title={LABELS.login}
        onPress={appBtnPress}
        btnStyle={styles.loginButtonStyle}
        textStyle={styles.buttonTextStyle}
        loading={loading}
      />

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPassStyle}>{LABELS.forgotPasswordsmall}</Text>
      </TouchableOpacity>
    </View>
  );
}
