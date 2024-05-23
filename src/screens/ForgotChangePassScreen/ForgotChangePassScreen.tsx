import {View, SafeAreaView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppButton, AuthHeader, BackButton, FocusAwareStatusBar, InputTextLabel, OTPFieldInput} from '../../components';
import {LABELS} from '../../labels';
import {GlobalStyles, COLORS} from '../../assets';
import {RouteProp, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {AuthStackParamList} from '../../routes/types.navigation';
import {appValidation} from '../../utils';
import {useAppNavigation} from '../../hooks/useAppNavigation';

export default function ForgotChangePassScreen(): JSX.Element {
  /*
   ** Hooks
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ForgotChangePassScreen'>>();
  const navigation = useAppNavigation();
  /*
   ** Routing params
   */
  const {email} = route.params;
  console.log('emailAddress', route.params);
  /*
   ** States
   */
  const [password, setPassword] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
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

  // when reste btn is pressed
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

  // when resend code is pressed
  const onPressResendCode = (): void => {
    const params = {
      email,
    };
    setResendCode(false);
    console.log('params', params);
  };
  /*
   ** Lifecycles
   */
  useEffect(() => {
    // if rensend code is false then only count start
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
      <InputTextLabel textLable={LABELS.password} onChangeText={setPassword} value={password} isPassword={true} />

      <InputTextLabel
        textLable={LABELS.reEnterPassword}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        isPassword={true}
      />

      <OTPFieldInput textLable={LABELS.confirmationCode} onChangeText={setConfirmationCode} />

      {/* Main button */}
      <AppButton title={LABELS.resetPassword} onPress={resetPassPressed} loading={loading} />

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
