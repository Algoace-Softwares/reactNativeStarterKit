import {Text, View, SafeAreaView, Image, ImageBackground} from 'react-native';
import React from 'react';
import {GlobalStyles, COLORS, IMAGES} from '../../assets';
import {AppButton, FocusAwareStatusBar} from '../../components';
import styles from './style';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {useTranslation} from 'react-i18next';

export default function OnBoardingScreen(): JSX.Element {
  /*
   * hooks
   */
  const navigation = useAppNavigation();
  const {t} = useTranslation();
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
        <Text style={styles.appLableStyle}>{t('appLabel')}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.btnContainer}>
        <AppButton title={t('login')} onPress={onPressLogin} btnStyle={GlobalStyles.smallBtn1Style} />
        <AppButton
          title={t('signUp')}
          onPress={onPressSignUp}
          btnStyle={GlobalStyles.smallBtn2Style}
          textStyle={GlobalStyles.btn2textStyle}
        />
      </View>
    </ImageBackground>
  );
}
