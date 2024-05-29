import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {AppButton, AuthHeader, BackButton, FocusAwareStatusBar, InputTextLabel} from '../../components';
import {GlobalStyles, COLORS} from '../../assets';
import styles from './style';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {loginSchema} from '../../utils/SchemaValidation';
import {useSelectedLanguage} from '../../i18n/utils';
import {useTranslation} from 'react-i18next';

export default function LoginScreen(): JSX.Element {
  /*
   ** States
   */
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading] = useState<boolean>(false);
  const {language, setLanguage} = useSelectedLanguage();
  const {t} = useTranslation();
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

      console.log('params:', params);
    } catch (error: unknown | ZodError) {
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ appBtnPress ~ error:', error);
    }
  };
  return (
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.onBoardingColor} barStyle={'dark-content'} />

      {/* Main Body */}
      <BackButton fillColor={COLORS.white} />

      {/* Header */}
      <AuthHeader text1={t('welcomeBack')} text2={t('signInLabel')} />

      {/* Input fields */}
      <InputTextLabel textLable={t('email')} onChangeText={setEmailAddress} value={emailAddress} />
      <InputTextLabel textLable={t('password')} onChangeText={setPassword} value={password} isPassword={true} />

      {/* Button */}
      <AppButton title={t('login')} onPress={appBtnPress} textStyle={styles.buttonTextStyle} loading={loading} />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          if (language === 'en' || language === 'en-US') {
            setLanguage('fr');
          } else {
            setLanguage('en');
          }
        }}>
        <Text style={styles.forgotPassStyle}>{t('changeLanguage')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPassStyle}>{t('forgotPasswordsmall')}</Text>
      </TouchableOpacity>
    </View>
  );
}
