import {View, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  AppButton,
  AppText,
  AuthHeader,
  BackButton,
  FocusAwareStatusBar,
  InputTextLabel,
  OTPFieldInput,
} from '../../components';
import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {AuthStackParamList} from '../../routes/types.navigation';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {changePasswordSchema} from '../../utils/SchemaValidation';
import {ZodError} from 'zod';
import {useTranslation} from 'react-i18next';
import {CustomTheme} from '../../theme';

export default function ForgotChangePassScreen(): JSX.Element {
  /*
   ** Hooks
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ForgotChangePassScreen'>>();
  const navigation = useAppNavigation();
  const {t} = useTranslation();
  const {colors} = useTheme() as CustomTheme;
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
  /*
   ** Functions
   */

  // when reste btn is pressed
  const resetPassPressed = (): void => {
    try {
      const params = {
        confirmationCode,
        emailAddress: email?.trim(),
        password,
        confirmPassword,
      };
      const data = changePasswordSchema.parse(params);
      console.log('🚀 ~ resetPassPressed ~ data:', data);
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ appBtnPress ~ error:', error);
    }
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
    <View style={styles.main}>
      <SafeAreaView />
      <FocusAwareStatusBar barStyle={'dark-content'} />
      {/* Main Content */}
      <BackButton />

      {/* Headers */}
      <AuthHeader text1={'forgotPasswordBold'} text2={'forgotChangePasswordLable'} viewStyle={styles.mainView} />

      {/* Inputs fields */}
      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />

      <InputTextLabel
        textLable={'reEnterPassword'}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        isPassword={true}
      />

      <OTPFieldInput textLable={t('confirmationCode')} onChangeText={setConfirmationCode} />

      {/* Main button */}
      <AppButton title={'resetPassword'} onPress={resetPassPressed} loading={loading} />

      <View style={styles.resendCodeViewstyle}>
        {resendCode ? (
          <AppText presetStyle={'formLabel'} onPress={onPressResendCode} transText={'didRecvCode'} />
        ) : (
          // <Text style={styles.renderTextStyle}>{`Wait for 00:${countDown}`}</Text>
          <AppText
            presetStyle={'formLabel'}
            onPress={onPressResendCode}
            textColor={colors.textDim}>{`Wait for 00:${countDown}`}</AppText>
        )}
      </View>
    </View>
  );
}
