import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {AppButton, AuthHeader, BackButton, FocusAwareStatusBar} from '../../components';
import {LABELS} from '../../labels';
import {GlobalStyles, COLORS, ICONS} from '../../assets';
import {RouteProp, useRoute} from '@react-navigation/native';
import styles from './styles';
import {AuthStackParamList} from '../../routes/types.navigation';
import {useAppNavigation} from '../../hooks/useAppNavigation';

export default function SocialAuthScreen(): JSX.Element {
  /*
   * hooks
   */
  const navigation = useAppNavigation();

  const route = useRoute<RouteProp<AuthStackParamList, 'SocialAuthScreen'>>();
  /*
   ** Route params
   */
  const {authFlow} = route.params;
  /*
   * Functions
   */
  /*
   *  btn press to proceed
   */
  const appBtnPress = (): void => {
    if (authFlow === 'signin') {
      navigation.navigate('LoginScreen');
    } else {
      navigation.navigate('SignupScreen');
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
      <AuthHeader
        text1={LABELS.selectCriteria}
        text2={LABELS.tapToProceed}
        viewStyle={styles.mainView}
      />

      {/* Button */}
      <AppButton
        title={LABELS.continuenWithFacebook}
        btnStyle={styles.facebookButtonStyle}
        textStyle={styles.buttonTextStyle}>
        <ICONS.FacebookLogoIcon width={38} height={38} fillColor={COLORS.white} />
      </AppButton>
      <AppButton
        title={LABELS.continuenWithGoogle}
        btnStyle={styles.goggleButtonStyle}
        textStyle={styles.googleButtonTextStyle}>
        <ICONS.GoogleLogoIcon width={38} height={38} />
      </AppButton>
      <AppButton
        title={LABELS.continuenWithApple}
        btnStyle={styles.appleButtonStyle}
        textStyle={styles.buttonTextStyle}>
        <ICONS.AppleLogoIcon width={40} height={40} fillColor={COLORS.white} />
      </AppButton>
      <Text style={styles.seperaterLableTextStyle}>OR</Text>
      <AppButton
        title={LABELS.continuenWithEmail}
        onPress={appBtnPress}
        btnStyle={styles.facebookButtonStyle}
        textStyle={styles.buttonTextStyle}
      />
    </View>
  );
}
