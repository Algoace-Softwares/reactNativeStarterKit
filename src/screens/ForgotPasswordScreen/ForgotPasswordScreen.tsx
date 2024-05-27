import {View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {AppButton, AuthHeader, BackButton, FocusAwareStatusBar, InputTextLabel} from '../../components';
import {LABELS} from '../../labels';
import {GlobalStyles, COLORS} from '../../assets';
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
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.onBoardingColor} barStyle={'dark-content'} />
      {/* Main Body */}
      <BackButton fillColor={COLORS.white} />

      {/* Header */}
      <AuthHeader text1={LABELS.forgotPasswordBold} text2={LABELS.forgotPasswordLable} />

      {/* Input field */}
      <InputTextLabel textLable={LABELS.emailAddress} onChangeText={setEmailAddres} value={emailAddress} />
      {/* Main button */}
      <AppButton title={LABELS.resetPassword} onPress={resetPassPressed} loading={loading} />
    </View>
  );
}
