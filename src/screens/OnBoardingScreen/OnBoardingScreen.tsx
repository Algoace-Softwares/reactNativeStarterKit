import {Text, View, SafeAreaView, Image, ImageBackground} from 'react-native';
import React from 'react';
import {GlobalStyles, COLORS, IMAGES} from '../../assets';
import {LABELS} from '../../labels';
import {AppButton, FocusAwareStatusBar} from '../../components';
import styles from './style';
import {useAppNavigation} from '../../hooks/useAppNavigation';

export default function OnBoardingScreen(): JSX.Element {
  /*
   * hooks
   */
  const navigation = useAppNavigation();
  /*
   * Functions
   */
  const onPressLogin = (): void => {
    navigation.navigate('LoginScreen');
  };
  const onPressSignUp = (): void => {
    navigation.navigate('SignupScreen');
  };

  return (
    <ImageBackground source={IMAGES.onBoarding} style={GlobalStyles.mainContainer} resizeMode={'cover'}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.onBoardingColor} barStyle={'dark-content'} />

      {/* Logo */}
      <View style={styles.appLogoView}>
        <Image source={IMAGES.appLogo} style={styles.appLogoImageStyle} resizeMode={'contain'} />
        <Text style={styles.appLableStyle}>{LABELS.appLabel}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.btnContainer}>
        <AppButton title={LABELS.login} onPress={onPressLogin} btnStyle={GlobalStyles.smallBtn1Style} />
        <AppButton
          title={LABELS.signUp}
          onPress={onPressSignUp}
          btnStyle={GlobalStyles.smallBtn2Style}
          textStyle={GlobalStyles.btn2textStyle}
        />
      </View>
    </ImageBackground>
  );
}
