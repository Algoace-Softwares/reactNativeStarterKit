import {Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {GlobalStyles, COLORS, ICONS} from '../../assets';
import {LABELS} from '../../labels';
import {AppButton, CarosalViewComponent, FocusAwareStatusBar} from '../../components';
import styles from './style';
import {onBoardingData} from '../../data';
import {useAppNavigation} from '../../hooks/useAppNavigation';

export default function OnBoardingScreen(): JSX.Element {
  /*
   * hooks
   */
  const navigation = useAppNavigation();
  /*
   * functions
   */
  const onPressLogin = (): void => {
    navigation.navigate('SocialAuthScreen', {authFlow: 'signin'});
  };
  const onPressSignUp = (): void => {
    navigation.navigate('SocialAuthScreen', {authFlow: 'signup'});
  };

  //Rendering
  return (
    <View style={GlobalStyles.mainContainer}>
      <SafeAreaView />
      <FocusAwareStatusBar backgroundColor={COLORS.onBoardingColor} barStyle={'dark-content'} />

      <CarosalViewComponent
        data={onBoardingData}
        selectedDotColor={COLORS.primary}
        unSelectedColor={COLORS.seconday}
      />
      {/* Logo */}
      <View style={styles.appLogoView}>
        <ICONS.AppLogoIcon width={100} height={100} />
        <Text style={styles.appLableStyle}>{LABELS.algoace}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.btnContainer}>
        <AppButton
          title={LABELS.login}
          onPress={onPressLogin}
          btnStyle={GlobalStyles.smallBtn1Style}
        />
        <AppButton
          title={LABELS.signUp}
          onPress={onPressSignUp}
          btnStyle={GlobalStyles.smallBtn2Style}
          textStyle={GlobalStyles.btn2textStyle}
        />
      </View>
    </View>
  );
}
