import {View, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles, COLORS} from '../../assets';
import {
  AppButton,
  AuthHeader,
  BackButton,
  FocusAwareStatusBar,
  InputDatePicker,
  InputTextLabel,
  ProfileImageUploader,
} from '../../components';
import {LABELS} from '../../labels';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {appValidation} from '../../utils';
import useImagePicker from '../../hooks/useImagePicker';
import {imageObjectType} from './types';
import {useAppNavigation} from '../../hooks/useAppNavigation';

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
  /*
   * custom hooks
   */
  const {onPressImageUpload} = useImagePicker();
  /*
   * Hooks
   */
  const navigation = useAppNavigation();

  // Functions
  const checkTextFieldValidation = (): boolean => {
    if (!emailAddress || !password || !firstName?.trim() || !lastName?.trim()) {
      Toast.show('Input fields required', Toast.LONG);
      return false;
    }
    // validate login
    if (!appValidation.validateLogin(emailAddress)) {
      Toast.show('email validation failed', Toast.LONG);
      return false;
    }
    // validate password
    if (!appValidation.validatePassword(password)) {
      Toast.show('password validation failed', Toast.LONG);
      return false;
    }
    // validate first name
    if (!appValidation.validateUserName(firstName)) {
      Toast.show('name validation failed', Toast.LONG);
      return false;
    }
    // validate last name
    if (!appValidation.validateUserName(lastName)) {
      Toast.show('name validation failed', Toast.LONG);

      return false;
    }

    return true;
  };
  /*
   **   When continue button is pressed
   */
  const ContinuePressed = (): void => {
    if (!checkTextFieldValidation()) {
      return;
    }

    navigation.navigate('ContactScreen', {
      firstName,
      lastName,
      emailAddress: emailAddress?.trim()?.toLowerCase(),
      password: password?.trim(),
    });
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
      <FocusAwareStatusBar backgroundColor={COLORS.onBoardingColor} barStyle={'dark-content'} />
      {/* Main Body */}
      <View style={styles.mainContainer2}>
        <BackButton fillColor={COLORS.white} />
        {/* Headers */}
        <AuthHeader text1={LABELS.signUp} text2={LABELS.signUpLabel} />
        {/* Profile Image uploader */}
        <ProfileImageUploader loading={loading} onPressCamera={onPressMedia} imageAsset={imageAsset} />
        {/* Input fields */}
        <InputTextLabel textLable={LABELS.firstName} onChangeText={setFirstName} value={firstName} />
        <InputTextLabel textLable={LABELS.lastName} onChangeText={setLastName} value={lastName} />
        <InputDatePicker textLable={LABELS.dob} onPressDate={setDateOfBirth} value={dateOfBirth} />
        <InputTextLabel textLable={LABELS.emailAddress} onChangeText={setEmailAddress} value={emailAddress} />
        <InputTextLabel textLable={LABELS.password} onChangeText={setPassword} value={password} isPassword={true} />

        <AppButton title={LABELS.continue} onPress={ContinuePressed} btnStyle={styles.loginButtonStyle} />

        {/* Main Button */}
      </View>
    </ScrollView>
  );
}
