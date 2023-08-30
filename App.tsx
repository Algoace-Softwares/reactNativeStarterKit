import {Text, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/routes';
// import {ErrorBoundary} from './src/screens';
import {ErrorBoundary} from './src/screens/ErrorBoundaryScreen/ErrorBoundary';
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

export default function App() {
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
    <ErrorBoundary catchErrors={Config.catchErrors} onReset={() => setRecoveredFromError(true)}>
      <AppNavigator />
    </ErrorBoundary>
  );
}

// write documentation for

// error boundary
// env mode
