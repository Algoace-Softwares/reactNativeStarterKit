import {View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  AuthHeader,
  BackButton,
  InputLablePhoneNumber,
  InputTextLabelDropDown,
  InputTextLableCountry,
  PhoneNumber,
  FocusAwareStatusBar,
} from '../../components';
import {LABELS} from '../../labels';
import {GlobalStyles, COLORS} from '../../assets';
import {RouteProp, useRoute} from '@react-navigation/native';
import styles from './style';
import Toast from 'react-native-simple-toast';
import {countryStates} from '../../data';
import {AuthStackParamList} from '../../routes/types.navigation';
import {useAppNavigation} from '../../hooks/useAppNavigation';

export default function ContactScreen() {
  const route = useRoute<RouteProp<AuthStackParamList, 'ContactScreen'>>();
  //route params
  const {lastName, emailAddress, password, firstName} = route.params;

  //States

  const [loading] = useState<boolean>(false);
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('afghanistan');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // Hooks
  const navigation = useAppNavigation();

  // Functions
  const checkTextFieldValidation = (): boolean => {
    if (!phoneNumber || !state) {
      return false;
    }
    return true;
  };

  // when signUp pressedfor
  const SignUpPressed = (): undefined => {
    if (!checkTextFieldValidation()) {
      Toast.show('Input fields required', Toast.LONG);
      return;
    }
    const params = {
      emailAddress: emailAddress,
      password: password,
      firstName,
      lastName,
      phoneNumber: PhoneNumber,
      state,
    };
    console.log('params is:', params);
    // navigating to another screen
    navigation.navigate('ConfirmSignupScreen', {
      email: emailAddress,
      password,
    });
  };

  // Rendering
  return (
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {/* Main Body */}
      <BackButton fillColor={COLORS.white} />
      {/* Header */}
      <AuthHeader text1={LABELS.contact} text2={LABELS.contactLable} viewStyle={styles.mainView} />
      {/* Input fields */}
      <InputLablePhoneNumber
        textLable={`Select ${LABELS.phoneNumber}`}
        viewStyle={styles.InputViewStyle}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />
      <InputTextLableCountry
        textLable={`Select ${LABELS.Country}`}
        viewStyle={styles.InputViewStyle}
        onCountrySelect={setCountry}
        value={country}
        placeHolder={'Select Country'}
      />
      <InputTextLabelDropDown
        textLable={`Select ${LABELS.state}`}
        viewStyle={styles.InputViewStyle}
        onChangeText={setState}
        value={state}
        dropDown={true}
        dropDownData={countryStates}
      />

      {/* Main button */}
      <AppButton
        loading={loading}
        title={LABELS.signUp}
        onPress={SignUpPressed}
        btnStyle={styles.loginButtonStyle}
        textStyle={styles.buttonTextStyle}
      />
    </View>
  );
}
