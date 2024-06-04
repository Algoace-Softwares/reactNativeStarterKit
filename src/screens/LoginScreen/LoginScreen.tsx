import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {AppButton, AppText, AuthHeader, BackButton, FocusAwareStatusBar, InputTextLabel} from '../../components';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {loginSchema} from '../../utils/SchemaValidation';
import {CustomTheme} from '../../theme';
import {useTheme} from '@react-navigation/native';
import createStyles from './style';
import {useSelectedLanguage} from '../../i18n/utils';

export default function LoginScreen(): JSX.Element {
  /*
   ** States
   */
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading] = useState<boolean>(false);
  const {language, setLanguage} = useSelectedLanguage();
  /*
   * Hooks
   */

  const navigation = useAppNavigation();
  const {colors} = useTheme() as CustomTheme;
  const styles = createStyles(colors);
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

      console.log('params:', params);
    } catch (error: unknown | ZodError) {
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ appBtnPress ~ error:', error);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar barStyle={'dark-content'} />

      {/* Main Body */}
      <BackButton />

      {/* Header */}
      <AuthHeader text1={'welcomeBack'} text2={'signInLabel'} />

      {/* Input fields */}
      <InputTextLabel textLable={'email'} onChangeText={setEmailAddress} value={emailAddress} />
      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />

      {/* Button */}
      <AppButton title={'login'} onPress={appBtnPress} loading={loading} />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          if (language === 'en' || language === 'en-US') {
            setLanguage('fr');
          } else {
            setLanguage('en');
          }
        }}>
        <Text style={styles.forgotPassStyle}>{'change language'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <AppText transText={'forgotPasswordsmall'} presetStyle={'default'} />
      </TouchableOpacity>
    </View>
  );
}
