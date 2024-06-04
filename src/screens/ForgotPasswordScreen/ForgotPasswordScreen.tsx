import {View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {AppButton, AuthHeader, BackButton, FocusAwareStatusBar, InputTextLabel} from '../../components';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {emailSchema} from '../../utils/SchemaValidation';
import styles from './style';

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
    <View style={styles.main}>
      <SafeAreaView />
      <FocusAwareStatusBar barStyle={'dark-content'} />
      {/* Main Body */}
      <BackButton />

      {/* Header */}
      <AuthHeader text1={'forgotPasswordBold'} text2={'forgotPasswordLable'} />

      {/* Input field */}
      <InputTextLabel textLable={'emailAddress'} onChangeText={setEmailAddres} value={emailAddress} />
      {/* Main button */}
      <AppButton title={'resetPassword'} onPress={resetPassPressed} loading={loading} />
    </View>
  );
}
