import {Text, View, SafeAreaView, Image, ImageBackground} from 'react-native';
import React from 'react';
import {IMAGES} from '../../assets';
import {AppButton, FocusAwareStatusBar} from '../../components';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {useTranslation} from 'react-i18next';
import {Colors, COLORS, GlobalStyles} from '../../theme';
import {useTheme} from '@react-navigation/native';
import createStyles from './style';

export default function OnBoardingScreen(): JSX.Element {
  /*
   * Hooks
   */
  const {colors} = useTheme();
  const styles = createStyles(colors as Colors);
  const navigation = useAppNavigation();
  const {t} = useTranslation();
  console.log('🚀 ~ OnBoardingScreen ~ colors:', colors);
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
    <ImageBackground source={IMAGES.onBoarding} style={styles.mainContainer} resizeMode={'cover'}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.statusBar} barStyle={'dark-content'} />

      {/* Logo */}
      <View style={styles.appLogoView}>
        <Image source={IMAGES.appLogo} style={styles.appLogoImageStyle} resizeMode={'contain'} />
        <Text style={styles.appLableStyle}>{t('appLabel')}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.btnContainer}>
        <AppButton title={t('login')} onPress={onPressLogin} smallBtn />
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
