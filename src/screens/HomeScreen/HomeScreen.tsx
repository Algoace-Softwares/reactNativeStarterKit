import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './style';
import {useSelectedLanguage} from '../../i18n/utils';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
  /*
   ** Hooks
   */
  const {language, setLanguage} = useSelectedLanguage();
  const {t} = useTranslation();

  return (
    <View style={styles.mainView}>
      <Text>HomeScreen</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          if (language === 'en' || language === 'en-US') {
            setLanguage('fr');
          } else {
            setLanguage('en');
          }
        }}>
        <Text style={styles.forgotPassStyle}>{t('changeLanguage')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
