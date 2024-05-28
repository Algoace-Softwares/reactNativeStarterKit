import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {LABELS} from '../../labels';
import {COLORS, GlobalStyles} from '../../assets';
import AppButton from './AppButton';

export type Props = {error: Error; resetError: () => void};
/*
 ** Cutsom error componenet
 */
const CustomError = (props: Props) => {
  // destructring props
  const {error, resetError} = props;
  console.log('🚀 ~ CustomError ~ error:', error);
  /*
   ** Function
   */
  /*
   ** Reseting to render the whole app
   */
  const resetingState = () => {
    resetError();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{LABELS.oops}</Text>
        <Text style={styles.subtitle}>{LABELS.errorBoundaryLable}</Text>
        {/* <Text style={styles.error}>{error.toString()}</Text> */}

        <AppButton title={LABELS.tryAgain} onPress={resetingState} textStyle={styles.buttonTextStyle} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: COLORS.white,
    ...GlobalStyles.l2,
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 16,
  },

  subtitle: {
    color: COLORS.black,
    fontSize: 32,
    fontWeight: '800',
  },

  title: {
    color: COLORS.black,
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 16,
  },
});

export default CustomError;
