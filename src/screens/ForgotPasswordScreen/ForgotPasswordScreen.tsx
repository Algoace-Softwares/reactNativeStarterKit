import React, {useState} from 'react';
import {AppButton, AppScreen, AuthHeader, BackButton, InputTextLabel} from '../../components';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {emailSchema} from '../../utils/SchemaValidation';

export default function ForgotPasswordScreen(): JSX.Element {
  /*
   ** States
   */
  const [emailAddress, setEmailAddres] = useState<string>('');
  const [loading] = useState<boolean>(false);
  /*
   ** Hooks
   */
  const navigation = useAppNavigation();
  /*
   ** Functions
   */

  /*
   ** Navigation to another screen
   */
  const resetPassPressed = (): void => {
    try {
      const params = {
        email: emailAddress,
      };
      console.log('resetPassword', params);
      const data = emailSchema.parse(params);
      console.log('🚀 ~ resetPassPressed ~ data:', data);
      navigation.navigate('ForgotChangePassScreen', {
        email: 'shaheer3.sa@algoace.com',
      });
    } catch (error: unknown | ZodError) {
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ appBtnPress ~ error:', error);
    }
  };

  // Rendering
  return (
    <AppScreen>
      <BackButton />

      <AuthHeader text1={'forgotPasswordBold'} text2={'forgotPasswordLable'} />

      <InputTextLabel textLable={'emailAddress'} onChangeText={setEmailAddres} value={emailAddress} />

      <AppButton title={'resetPassword'} onPress={resetPassPressed} loading={loading} />
    </AppScreen>
  );
}
