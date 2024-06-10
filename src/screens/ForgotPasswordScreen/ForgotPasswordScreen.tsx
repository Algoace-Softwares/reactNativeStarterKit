import React, {useState} from 'react';
import {AppButton, AppScreen, AuthHeader, BackButton, InputTextLabel} from '../../components';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {emailSchema} from '../../utils/SchemaValidation';
import {useAppStore} from '../../store';

export default function ForgotPasswordScreen(): JSX.Element {
  /*
   ** States
   */
  const [emailAddress, setEmailAddres] = useState<string>('shaheer.ahmed@algoace.com');
  /*
   ** Hooks
   */
  const navigation = useAppNavigation();
  const forgotPassword = useAppStore(state => state.forgotPassword);
  const isLoading = useAppStore(state => state.authLoading);
  /*
   ** Functions
   */
  /*
   ** Navigation to another screen
   */
  const resetPassPressed = async () => {
    try {
      const params = {
        email: emailAddress,
      };
      emailSchema.parse(params);

      await forgotPassword(params.email);

      navigation.navigate('ForgotChangePassScreen', {
        email: params.email,
      });
    } catch (error: unknown | ZodError) {
      console.log('🚀 ~ appBtnPress ~ error:', error);
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
    }
  };

  // Rendering
  return (
    <AppScreen>
      <BackButton />

      <AuthHeader text1={'forgotPasswordBold'} text2={'forgotPasswordLable'} />

      <InputTextLabel textLable={'emailAddress'} onChangeText={setEmailAddres} value={emailAddress} />

      <AppButton title={'resetPassword'} onPress={resetPassPressed} loading={isLoading} />
    </AppScreen>
  );
}
