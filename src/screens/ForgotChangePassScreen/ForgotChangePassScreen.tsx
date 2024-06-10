import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {AppButton, AppScreen, AppText, AuthHeader, BackButton, InputTextLabel, OTPFieldInput} from '../../components';
import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {AuthStackParamList} from '../../routes/types.navigation';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {changePasswordSchema} from '../../utils/SchemaValidation';
import {ZodError} from 'zod';
import {CustomTheme} from '../../theme';
import {useAppStore} from '../../store';

export default function ForgotChangePassScreen(): JSX.Element {
  /*
   ** Hooks
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ForgotChangePassScreen'>>();
  const navigation = useAppNavigation();
  const {colors} = useTheme() as CustomTheme;
  const forgotChangePassword = useAppStore(state => state.forgotChangePassword);
  const isLoading = useAppStore(state => state.authLoading);
  const resendConfirmationCode = useAppStore(state => state.resendCode);
  /*
   ** Routing params
   */
  const {email} = route.params;
  console.log('emailAddress', route.params);
  /*
   ** States
   */
  const [password, setPassword] = useState<string>('Admin1234');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('Admin1234');
  const [countDown, setCountDown] = useState<number>(59);
  const [resendCode, setResendCode] = useState<boolean>(true);
  /*
   ** Functions
   */

  // when reste btn is pressed
  const resetPassPressed = async () => {
    try {
      const params = {
        confirmationCode,
        email: email?.trim(),
        password,
        confirmPassword,
      };
      const data = changePasswordSchema.parse(params);
      console.log('🚀 ~ resetPassPressed ~ data:', data);
      await forgotChangePassword(params.email, params.password, params.confirmationCode);
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
    setResendCode(false);
    resendConfirmationCode(email);
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
    <AppScreen>
      <BackButton />

      <AuthHeader text1={'forgotPasswordBold'} text2={'forgotChangePasswordLable'} viewStyle={styles.mainView} />

      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />

      <InputTextLabel
        textLable={'reEnterPassword'}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        isPassword={true}
      />

      <OTPFieldInput textLable={'confirmationCode'} onChangeText={setConfirmationCode} />

      <AppButton title={'resetPassword'} onPress={resetPassPressed} loading={isLoading} />

      <View style={styles.resendCodeViewstyle}>
        {resendCode ? (
          <AppText presetStyle={'formLabel'} onPress={onPressResendCode} transText={'didRecvCode'} />
        ) : (
          <AppText
            presetStyle={'formLabel'}
            onPress={onPressResendCode}
            textColor={colors.textDim}>{`Wait for 00:${countDown}`}</AppText>
        )}
      </View>
    </AppScreen>
  );
}
