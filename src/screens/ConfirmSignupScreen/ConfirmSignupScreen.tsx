import {Text, View, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppButton, AuthHeader, BackButton, FocusAwareStatusBar, OTPFieldInput} from '../../components';
import {RouteProp, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AuthStackParamList} from '../../routes/types.navigation';
import {styles} from './style';
import {ZodError} from 'zod';
import {confirmationCodeValidation} from '../../utils/SchemaValidation';
import {useTranslation} from 'react-i18next';
import {COLORS, GlobalStyles} from '../../theme';

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
   ** Hooks
   */
  const {t} = useTranslation();
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
      <FocusAwareStatusBar backgroundColor={COLORS.statusBar} barStyle={'dark-content'} />
      {/* Main Body */}
      <BackButton />
      {/* Header */}
      <AuthHeader text1={t('confirmSignUp')} text2={t('verificationSentCode')} />
      {/* OTP Input field */}
      <OTPFieldInput textLable={t('confirmationCode')} onChangeText={setConfirmationCode} />
      {/* Main button */}
      <AppButton title={t('submit')} onPress={submitCodePressed} loading={loading} />

      <View style={styles.resendCodeViewstyle}>
        {resendCode ? (
          <Text style={styles.renderTextStyle} onPress={onPressResendCode}>
            {t('didRecvCode')} <Text style={styles.renderTextStyle}>{t('resendCode')}</Text>
          </Text>
        ) : (
          <Text style={styles.renderTextStyle}>{`${t('waitFor')} 00:${countDown}`}</Text>
        )}
      </View>
    </View>
  );
}
