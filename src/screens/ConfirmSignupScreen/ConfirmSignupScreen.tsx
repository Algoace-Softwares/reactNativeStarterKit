import {Text, View, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, GlobalStyles} from '../../assets';
import {AppButton, AuthHeader, BackButton, FocusAwareStatusBar, OTPFieldInput} from '../../components';
import {LABELS} from '../../labels';
import {RouteProp, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AuthStackParamList} from '../../routes/types.navigation';
import {styles} from './style';
import {ZodError} from 'zod';
import {confirmationCodeValidation} from '../../utils/SchemaValidation';

export default function ConfirmSignupScreen(): JSX.Element {
  /*
   ** Hooks
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ConfirmSignupScreen'>>();
  /*
   ** Routing params
   */
  const {email, password} = route.params;
  /*
   ** States
   */
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [countDown, setCountDown] = useState<number>(59);
  const [resendCode, setResendCode] = useState<boolean>(true);
  const [loading] = useState<boolean>(false);
  /*
   ** Functions
   */

  /*
   ** when submit code is pressed
   */
  const submitCodePressed = () => {
    try {
      const params = {
        email,
        confirmationCode,
        password,
      };
      // api call
      console.log('params is', params);
      const data = confirmationCodeValidation.parse({confirmationCode});
      console.log('🚀 ~ submitCodePressed ~ data:', data);
    } catch (error) {
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ submitCodePressed ~ error:', error);
    }
  };
  /*
   ** When resend code is pressed
   */
  const onPressResendCode = (): void => {
    const params = {
      email,
    };
    setResendCode(false);
    console.log('params is', params);
  };
  /*
   **   Lifecycle methods
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

  return (
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {/* Main Body */}
      <BackButton fillColor={COLORS.white} />
      {/* Header */}
      <AuthHeader text1={LABELS.confirmSignUp} text2={LABELS.verificationSentCode} />
      {/* otp Input field */}
      <OTPFieldInput textLable={LABELS.confirmationCode} onChangeText={setConfirmationCode} />
      {/* Main button */}
      <AppButton title={LABELS.submit} onPress={submitCodePressed} loading={loading} />

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
