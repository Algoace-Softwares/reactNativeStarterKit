// markdown file and add links from here

// import {Platform} from 'react-native';

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font.
    light: 'spaceGroteskLight',
    normal: 'spaceGroteskRegular',
    medium: 'spaceGroteskMedium',
    semiBold: 'spaceGroteskSemiBold',
    bold: 'spaceGroteskBold',
  },
  poppins: {
    Black: 'Poppins-Black',
    Bold: 'Poppins-Bold',
    Light: 'Poppins-Light',
    Medium: 'Poppins-Medium',
    Regular: 'Poppins-Regular',
    Thin: 'Poppins-Thin',
  },
};

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.poppins,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  // secondary: Platform.select({ios: fonts.helveticaNeue, android: fonts.sansSerif}),
  /**
   * Lets get fancy with a monospace font!
   */
  // code: Platform.select({ios: fonts.courier, android: fonts.monospace}),
};
