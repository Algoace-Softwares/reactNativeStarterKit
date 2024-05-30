import {View, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  AuthHeader,
  BackButton,
  FocusAwareStatusBar,
  InputDatePicker,
  InputTextLabel,
  ProfileImageUploader,
} from '../../components';
import Toast from 'react-native-simple-toast';
import styles from './style';
import useImagePicker from '../../hooks/useImagePicker';
import {imageObjectType} from './types';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {signupSchema} from '../../utils/SchemaValidation';
import {useTranslation} from 'react-i18next';
import {COLORS, GlobalStyles} from '../../theme';

export default function SignupScreen() {
  /*
   ** State
   */
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [imageAsset, setImageAsset] = useState<imageObjectType | null>(null);
  const {t} = useTranslation();
  /*
   * custom hooks
   */
  const {onPressImageUpload} = useImagePicker();
  /*
   * Hooks
   */
  const navigation = useAppNavigation();
  /*
   ** Functions
   */

  /*
   **   When continue button is pressed
   */
  const ContinuePressed = (): void => {
    try {
      const params = {
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        email: emailAddress?.trim()?.toLowerCase(),
        password: password?.trim(),
        dateOfBirth,
      };
      const data = signupSchema.parse(params);
      console.log('🚀 ~ ContinuePressed ~ data:', data);
      navigation.navigate('ContactScreen', params);
    } catch (error) {
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ ContinuePressed ~ error:', error);
    }
  };
  /*
   * open camear or gallery for image upload
   */
  const onPressMedia = (): void => {
    setLoading(true);
    // calling hook function
    onPressImageUpload({
      callBck: result => {
        console.log('result in main file is', result);
        if (result.assets && result.assets[0]) {
          const imageData = result.assets[0] as unknown as imageObjectType;
          setImageAsset(imageData);
        }
        setLoading(false);
      },
    });
  };
  // Rendering
  return (
    <ScrollView style={GlobalStyles.mainContainer} showsVerticalScrollIndicator={false}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.statusBar} barStyle={'dark-content'} />
      {/* Main Body */}
      <View style={styles.mainContainer2}>
        <BackButton />
        {/* Headers */}
        <AuthHeader text1={t('signUp')} text2={t('signUpLabel')} />
        {/* Profile Image uploader */}
        <ProfileImageUploader loading={loading} onPressCamera={onPressMedia} imageAsset={imageAsset} />
        {/* Input fields */}
        <InputTextLabel textLable={t('firstName')} onChangeText={setFirstName} value={firstName} />
        <InputTextLabel textLable={t('lastName')} onChangeText={setLastName} value={lastName} />
        <InputDatePicker textLable={t('dob')} onPressDate={setDateOfBirth} value={dateOfBirth} />
        <InputTextLabel textLable={t('emailAddress')} onChangeText={setEmailAddress} value={emailAddress} />
        <InputTextLabel textLable={t('password')} onChangeText={setPassword} value={password} isPassword={true} />

        <AppButton title={t('continue')} onPress={ContinuePressed} btnStyle={styles.loginButtonStyle} />

        {/* Main Button */}
      </View>
    </ScrollView>
  );
}
