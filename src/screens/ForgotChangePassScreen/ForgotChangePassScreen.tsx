import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  AppButton,
  AuthHeader,
  BackButton,
  FocusAwareStatusBar,
  InputTextLabel,
  OTPFieldInput,
} from '../../components';
import {LABELS} from '../../labels';
import {GlobalStyles, COLORS, ICONS} from '../../assets';
import {RouteProp, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {AuthStackParamList} from '../../routes/types.navigation';
import {appValidation} from '../../utils';
import {useAppNavigation} from '../../hooks/useAppNavigation';

export default function ForgotChangePassScreen(): JSX.Element {
  //Hooks
  const route = useRoute<RouteProp<AuthStackParamList, 'ForgotChangePassScreen'>>();
  const navigation = useAppNavigation();
  // route params
  const {email} = route.params;
  console.log('emailAddress', route.params);
  // states
  const [password, setPassword] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passSecure, setPassSecure] = useState<boolean>(true);
  const [passSecure1, setPassSecure1] = useState<boolean>(true);
  const [countDown, setCountDown] = useState<number>(59);
  const [resendCode, setResendCode] = useState<boolean>(true);
  const [loading] = useState<boolean>(false);

  // Functions
  const checkTextFieldValidation = (): boolean => {
    if (!email || !password || !confirmPassword || !confirmationCode) {
      Toast.show('Input filed required', Toast.LONG);
      return false;
    } else if (password !== confirmPassword) {
      Toast.show('Password does not match', Toast.LONG);
      return false;
    } else if (!appValidation.validatePassword(password)) {
      Toast.show('Invalid password', Toast.LONG);
      return false;
    }
    return true;
  };

  //when reste btn is pressed
  const resetPassPressed = (): void => {
    if (!checkTextFieldValidation()) {
      return;
    }
    const params = {
      emailAddress: email?.trim(),
      password,
      confirmationCode,
    };
    console.log('params', params);
    navigation.goBack();
    navigation.goBack();
  };

  //when resend code is pressed
  const onPressResendCode = (): void => {
    const params = {
      email,
    };
    setResendCode(false);
    console.log('params', params);
  };

  // Lifecycle
  useEffect(() => {
    //if rensend code is false then only count start
    let interval: NodeJS.Timeout;
    if (resendCode === false) {
      interval = setInterval(() => {
        if (countDown < 1) {
          setResendCode(true);
          setCountDown(59);
          clearInterval(interval);
        } else {
          setCountDown(prevValue => prevValue - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendCode, countDown]);

  // Rendering
  return (
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {/* Main Content */}
      <BackButton fillColor={COLORS.white} />

      {/* Headers */}
      <AuthHeader
        text1={LABELS.forgotPasswordBold}
        text2={LABELS.forgotChangePasswordLable}
        viewStyle={styles.mainView}
      />

      {/* Inputs fields */}
      <InputTextLabel
        textLable={LABELS.password}
        textInputStyle={styles.textInputStyle}
        viewStyle={styles.InputViewStyle}
        onChangeText={setPassword}
        value={password}
        secureEntry={passSecure}
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
      <InputTextLabel
        textLable={LABELS.re_enterPassword}
        textInputStyle={styles.textInputStyle}
        viewStyle={styles.InputViewStyle}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureEntry={passSecure1}
        rightIcon={true}>
        {passSecure1 ? (
          <TouchableOpacity onPress={() => setPassSecure1(!passSecure1)}>
            <ICONS.EyeOffIcon color={COLORS.grey4} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setPassSecure1(!passSecure1)}>
            <ICONS.EyeOnIcon color={COLORS.grey4} />
          </TouchableOpacity>
        )}
      </InputTextLabel>
      <OTPFieldInput textLable={LABELS.confirmationCode} onChangeText={setConfirmationCode} />

      {/* Main button */}
      <AppButton
        title={LABELS.resetPassword}
        onPress={resetPassPressed}
        btnStyle={styles.loginButtonStyle}
        textStyle={styles.buttonTextStyle}
        loading={loading}
      />
      <View style={styles.resendCodeViewstyle}>
        {resendCode ? (
          <Text style={styles.renderTextStyle} onPress={onPressResendCode}>
            {LABELS.didRecvCode} <Text style={styles.renderTextStyle}>{LABELS.resendCode}</Text>
          </Text>
        ) : (
          <Text style={styles.renderTextStyle}>{`Wait for 00:${countDown}`}</Text>
        )}
      </View>
    </View>
  );
}
