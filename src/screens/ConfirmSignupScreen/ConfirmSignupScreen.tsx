import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, GlobalStyles, WIDTH} from '../../assets';
import {AppButton, AuthHeader, BackButton, OTPFieldInput} from '../../components';
import {LABELS} from '../../labels';
import {RouteProp, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AuthStackParamList} from '../../routes/types.navigation';

export default function ConfirmSignupScreen(): JSX.Element {
  //Hooks
  const route = useRoute<RouteProp<AuthStackParamList, 'ConfirmSignupScreen'>>();
  // navogation routes params
  const {email, password} = route.params;

  // States
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [countDown, setCountDown] = useState<number>(59);
  const [resendCode, setResendCode] = useState<boolean>(true);
  const [loading] = useState<boolean>(true);

  // Functions
  /*
   ** Cheking filed validation
   */
  const checkTextFieldValidation = () => {
    if (!confirmationCode) {
      return false;
    }
    return true;
  };
  /*
   ** when submit code is pressed
   */
  const submitCodePressed = () => {
    if (!checkTextFieldValidation()) {
      Toast.show('validation failed', Toast.LONG);
    }
    const params = {
      email,
      confirmationCode,
      password,
    };
    // api call
    console.log('params is', params);
  };
  /*
   ** When resend code is pressed
   */
  const onPressResendCode = (): void => {
    const params = {
      email,
    };
    setResendCode(false);
    console.log('params is', params);
  };
  /*
   **   Lifecycle methods
   */
  useEffect(() => {
    //if rensend code is false then only count start
    let interval: NodeJS.Timeout;
    if (resendCode === false) {
      interval = setInterval(() => {
        if (countDown < 1) {
          setResendCode(true);
          setCountDown(59);
          clearInterval(interval);
        } else {
          setCountDown(prevValue => prevValue - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendCode, countDown]);

  // Rendering
  return (
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {/* Main Body */}
      <BackButton fillColor={COLORS.white} />
      {/* Header */}
      <AuthHeader
        text1={LABELS.confirmSignUp}
        text2={LABELS.verificationSentCode}
        viewStyle={styles.mainView}
      />
      {/* otp Input field */}
      <OTPFieldInput textLable={LABELS.confirmationCode} onChangeText={setConfirmationCode} />
      {/* Main button */}
      <AppButton
        title={LABELS.submit}
        onPress={submitCodePressed}
        btnStyle={styles.loginButtonStyle}
        textStyle={styles.buttonTextStyle}
        loading={loading}
      />
      <View style={styles.resendCodeViewstyle}>
        {resendCode ? (
          <Text style={styles.renderTextStyle} onPress={onPressResendCode}>
            {LABELS.didRecvCode} <Text style={styles.renderTextStyle}>{LABELS.resendCode}</Text>
          </Text>
        ) : (
          <Text style={styles.renderTextStyle}>{`Wait for 00:${countDown}`}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginVertical: 30,
    marginLeft: 21,
  },
  textInputStyle: {
    height: 45,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey4,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  InputViewStyle: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  loginButtonStyle: {
    backgroundColor: COLORS.primary,
    marginTop: 35,
    alignSelf: 'center',
    width: WIDTH * 0.9,
  },
  buttonTextStyle: {
    color: COLORS.white,
    ...GlobalStyles.l2,
  },
  renderTextStyle: {
    color: COLORS.primary,
    ...GlobalStyles.b2,
    textDecorationLine: 'underline',
  },
  resendViewStyle: {
    marginVertical: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  codeFieldRoot: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.grey2,
    textAlign: 'center',
    color: COLORS.black,
  },
  resendCodeViewstyle: {
    marginTop: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});
