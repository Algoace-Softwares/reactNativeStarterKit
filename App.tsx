/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {ErrorBoundary} from './src/screens/ErrorBoundaryScreen/ErrorBoundary';
import AppNavigator from './src/routes';
import Config from './src/config';

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

function App(): React.JSX.Element {
  /**
   * - disabling font scalling as a text
   */
  (Text as unknown as TextWithDefaultProps).defaultProps =
    (Text as unknown as TextWithDefaultProps).defaultProps || {};
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
  }, []);

  /**
   * Your main componenet
   */
  return (
    // <ErrorBoundary catchErrors={Config.catchErrors} onReset={() => setRecoveredFromError(true)}>
    //   <AppNavigator />
    // </ErrorBoundary>
    <AppNavigator />
  );
}

export default App;

// typescript
// zustand
// react query
// change to babel svg setting
// zod
// react native testing
// internatilation
// env setup
// theme setup
// coding best practice for text and scrol view in ignit boiler plate
