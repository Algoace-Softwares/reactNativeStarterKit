import {View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  AuthHeader,
  BackButton,
  InputLablePhoneNumber,
  InputTextLabelDropDown,
  InputTextLableCountry,
  FocusAwareStatusBar,
} from '../../components';
import {RouteProp, useRoute} from '@react-navigation/native';
import styles from './style';
import Toast from 'react-native-simple-toast';
import {countryStates} from '../../data';
import {AuthStackParamList} from '../../routes/types.navigation';
import {useAppNavigation} from '../../hooks/useAppNavigation';

export default function ContactScreen() {
  /*
   ** Routing params
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ContactScreen'>>();
  const {lastName, email, password, firstName} = route.params;
  /*
   ** States
   */
  const [loading] = useState<boolean>(false);
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('afghanistan');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  /*
   ** Hooks
   */
  const navigation = useAppNavigation();

  /*
   ** Functions
   */
  const checkTextFieldValidation = (): boolean => {
    if (!phoneNumber || !state) {
      return false;
    }
    return true;
  };
  /*
   ** when signUp pressedfor
   */
  const SignUpPressed = (): any => {
    if (!checkTextFieldValidation()) {
      Toast.show('Input fields required', Toast.LONG);
      return;
    }
    const params = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      state,
    };
    console.log('params is:', params);
    // navigating to another screen
    navigation.navigate('ConfirmSignupScreen', {
      email,
      password,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar barStyle={'dark-content'} />
      {/* Main Body */}
      <BackButton />
      {/* Header */}
      <AuthHeader text1={'contact'} text2={'contactLable'} />
      {/* Input fields */}
      <InputLablePhoneNumber
        textLable={'phoneNumber'}
        viewStyle={styles.InputViewStyle}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />
      <InputTextLableCountry
        textLable={'Country'}
        viewStyle={styles.InputViewStyle}
        onCountrySelect={setCountry}
        value={country}
        placeHolder={'select-country'}
      />
      <InputTextLabelDropDown
        textLable={'state'}
        viewStyle={styles.InputViewStyle}
        onChangeText={setState}
        value={state}
        dropDown={true}
        dropDownData={countryStates}
      />

      {/* Main button */}
      <AppButton loading={loading} title={'signUp'} onPress={SignUpPressed} />
    </View>
  );
}
