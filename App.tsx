/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './src/i18n';
import React, {useEffect} from 'react';
import {I18nManager, Text, TextInput} from 'react-native';
import {ErrorBoundary} from './src/screens/ErrorBoundaryScreen/ErrorBoundary';
import AppNavigator from './src/routes';
import Config from './src/config';
import {getLocales} from 'react-native-localize';

/**
 * declearing interface to avoid typescript error for text
 */
interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}
/**
 * declearing interface to avoid typescript error for textInput
 */
interface TextInputWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}

// Forcefully content start from Left to Right - Phone setting does not effect here
I18nManager.forceRTL(false);

function App(): React.JSX.Element {
  /**
   * - disabling font scalling as a text
   */
  (Text as unknown as TextWithDefaultProps).defaultProps = (Text as unknown as TextWithDefaultProps).defaultProps || {};
  (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
  /**
   * - disabling font scalling as a TextInput
   */
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps =
    (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;
  /*
   ** States
   */
  const [_, setRecoveredFromError] = React.useState(false);

  useEffect(() => {
    /**
     * - All your app third part module initialization like @notifee
     *
     */
    console.log('get locales', getLocales());
  }, []);

  /**
   * Your main componenet
   */
  return (
    <ErrorBoundary catchErrors={Config.catchErrors} onReset={() => setRecoveredFromError(true)}>
      <AppNavigator />
    </ErrorBoundary>
  );
}

export default App;

// zustandZW
// react query
// react native testing
// ignite navigation setup
// ignite header setup
// env setup
//  dark and light theme setup
// coding best practice for text and scrol view in ignit boiler plate
