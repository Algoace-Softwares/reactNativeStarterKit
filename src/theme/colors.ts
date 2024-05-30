const palette = {
  neutral100: '#f5fff8',
  neutral200: '#d6ffd8',
  neutral300: '#b7ffb9',
  neutral400: '#98ff9a',
  neutral500: '#7aff7a',
  neutral600: '#60e460',
  neutral700: '#47cc47',
  neutral800: '#2eb32e',

  primary000: '#D4E6F2',
  primary100: '#80a8f7',
  primary200: '#4071e6',
  primary300: '#1c47cc',
  primary400: '#0d2eab',
  primary500: '#064aac',
  primary600: '#053c93',

  secondary100: '#a6a6a6',
  secondary200: '#7a7a7a',
  secondary300: '#5e5e5e',
  secondary400: '#424242',
  secondary500: '#4f4f4f',
  secondary600: '#383838',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',

  angry100: '#F2D6CD',
  angry500: '#EB5757',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',
  overlay100: 'rgba(6, 74, 172, 0.1)',
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
};
