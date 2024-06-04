import {View, SafeAreaView, Image, ImageBackground} from 'react-native';
import React from 'react';
import {IMAGES} from '../../assets';
import {AppButton, AppText, FocusAwareStatusBar} from '../../components';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {CustomTheme} from '../../theme';
import {useTheme} from '@react-navigation/native';
import createStyles from './style';

export default function OnBoardingScreen(): JSX.Element {
  /*
   * Hooks
   */
  const {colors} = useTheme() as CustomTheme;
  const styles = createStyles(colors);
  const navigation = useAppNavigation();
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
      <FocusAwareStatusBar barStyle={'dark-content'} />

      {/* Logo */}
      <View style={styles.appLogoView}>
        <Image source={IMAGES.appLogo} style={styles.appLogoImageStyle} resizeMode={'contain'} />
        <AppText transText={'appLabel'} presetStyle={'heading'} textColor={colors.background} />
      </View>

      {/* Buttons */}
      <View style={styles.btnContainer}>
        <AppButton title={'login'} onPress={onPressLogin} smallBtn={true} />
        <AppButton
          title={'signUp'}
          onPress={onPressSignUp}
          smallBtn={true}
          btnStyle={styles.smallBtn2}
          textStyle={styles.smallBtn2Text}
        />
      </View>
    </ImageBackground>
  );
}
