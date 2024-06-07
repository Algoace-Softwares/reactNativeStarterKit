import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {AppButton, AppScreen, AppText, AuthHeader, BackButton, InputTextLabel} from '../../components';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {loginSchema} from '../../utils/SchemaValidation';
import styles from './style';
import {useAppStore} from '../../store';

export default function LoginScreen(): JSX.Element {
  /*
   ** States
   */
  const [emailAddress, setEmailAddress] = useState<string>('shaheer.ahmed@algoace.com');
  const [password, setPassword] = useState<string>('Admin1234');
  const {signIn: signInUser, isLoading} = useAppStore(state => state);
  console.log('🚀 ~ LoginScreen ~ isLoading:', isLoading);
  /*
   * Hooks
   */
  const navigation = useAppNavigation();
  /*
   * Functions
   */

  /*
   *  Btn press to make user Login
   */
  const appBtnPress = () => {
    try {
      const params = {
        email: emailAddress?.trim(),
        password,
      };

      const data = loginSchema.parse(params);
      console.log('🚀 ~ appBtnPress ~ data:', data);
      // singing user in app
      signInUser(params);
      console.log('params:', params);
    } catch (error: unknown | ZodError) {
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ appBtnPress ~ error:', error);
    }
  };
  return (
    <AppScreen>
      <BackButton />

      <AuthHeader text1={'welcomeBack'} text2={'signInLabel'} />

      <InputTextLabel textLable={'email'} onChangeText={setEmailAddress} value={emailAddress} />
      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />

      <AppButton title={'login'} onPress={appBtnPress} loading={isLoading} />

      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <AppText transText={'forgotPasswordsmall'} presetStyle={'default'} />
      </TouchableOpacity>
    </AppScreen>
  );
}
