import React, {ReactElement} from 'react';
import {ImageStyle, StyleProp, StyleSheet, TextStyle, TouchableOpacityProps, View, ViewStyle} from 'react-native';
import {TxKeyPath} from '../../i18n/types';
import {IconTypes} from '../../assets/icons';
import {COLORS, CustomTheme, HEIGHT, SPACING} from '../../theme';
import {useTheme} from '@react-navigation/native';
import AppText from './AppText';
import AppIcon from './AppIcon';
import AppImage from './AppImage';

export interface HeaderProps {
  /**
   * The layout of the title relative to the action components.
   * - `center` will force the title to always be centered relative to the header. If the title or the action buttons are too long, the title will be cut off.
   * - `flex` will attempt to center the title relative to the action buttons. If the action buttons are different widths, the title will be off-center relative to the header.
   * - `avatar` will attempt to center the avaratar as well as text
   */
  titleMode?: 'center' | 'flex' | 'avatar';
  /**
   * Optional title style override.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Optional outer title container style override.
   */
  titleContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional inner header wrapper style override.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional outer header container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Title text to display if not using `tx` or nested components.
   */
  title?: string;
  /**
   * Title text which is looked up via i18n.
   */
  transTitle?: TxKeyPath;
  /**
   * Icon that should appear on the left.
   * Can be used with `onLeftPress`.
   */
  leftIcon?: IconTypes;
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string;

  /**
   * Left action custom ReactElement if the built in action props don't suffice.
   * Overrides `leftIcon`, `leftTx` and `leftText`.
   */
  LeftActionComponent?: ReactElement;
  /**
   * What happens when you press the left icon or text action.
   */
  onLeftPress?: TouchableOpacityProps['onPress'];
  /**
   * Icon that should appear on the right.
   * Can be used with `onRightPress`.
   */
  rightIcon?: IconTypes;
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string;
  /**
   * Right action custom ReactElement if the built in action props don't suffice.
   * Overrides `rightIcon`, `rightTx` and `rightText`.
   */
  RightActionComponent?: ReactElement;
  /**
   * user profile image url
   */
  avatarUrl?: string;
  /**
   * What happens when you press the right icon or text action.
   */
  onRightPress?: TouchableOpacityProps['onPress'];
  /**
   * How wide should the profile image be?
   */
  maxWidth?: number;
  /**
   * How tall should the profile image be?
   */
  maxHeight?: number;
  /*
   ** profile image style
   */
  avatarStyle?: StyleProp<ImageStyle>;
}

interface HeaderActionProps {
  backgroundColor?: string;
  icon?: IconTypes;
  iconColor?: string;
  onPress?: TouchableOpacityProps['onPress'];
  ActionComponent?: ReactElement;
}

/**
 * Header action componenent
 */
function HeaderAction(props: HeaderActionProps) {
  /*
   ** Destruturing props
   */
  const {backgroundColor, icon, onPress, ActionComponent, iconColor} = props;
  /*
   ** If we getting custome header action them we would return that componenet only
   */
  if (ActionComponent) return ActionComponent;

  if (icon) {
    return (
      <AppIcon
        width={24}
        height={24}
        icon={icon}
        color={iconColor}
        onPress={onPress}
        containerStyle={[styles.actionIconContainer, {backgroundColor}]}
      />
    );
  }

  return <View style={[styles.actionFillerConatiner, {backgroundColor}]} />;
}
/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 * The Header is meant to be used with the `screenOptions.header` option on navigators, routes, or screen components via `navigation.setOptions({ header })`.
 */
export default function AppHeader(props: HeaderProps) {
  /*
   ** Destruturing props
   */
  const {
    backgroundColor = '',
    LeftActionComponent,
    leftIcon,
    leftIconColor,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    title,
    titleMode = 'center',
    titleContainerStyle,
    style,
    titleStyle,
    containerStyle,
    transTitle,
    avatarUrl,
    maxWidth = 60,
    maxHeight = 60,
    avatarStyle,
  } = props;
  /*
   ** Hooks
   */
  const {colors} = useTheme() as CustomTheme;
  /*
   ** Checking if we get title as prop
   */
  const titleContent = title || transTitle;
  /*
   **Checking if we are recieving background color
   */
  const bgColor = backgroundColor || colors?.background;

  return (
    <View style={[$container(bgColor), containerStyle, styles.mainContainer]}>
      <View style={[styles.contentContainerStyle, style]}>
        <HeaderAction
          icon={leftIcon}
          iconColor={leftIconColor}
          onPress={onLeftPress}
          backgroundColor={backgroundColor}
          ActionComponent={LeftActionComponent}
        />

        {titleContent && (
          <View
            style={[
              titleMode === 'center' && styles.titleCenter,
              titleMode === 'flex' && styles.titleFlex,
              titleMode === 'avatar' && styles.avatar,
              titleContainerStyle,
            ]}
            pointerEvents='none'>
            {avatarUrl && (
              <AppImage
                source={{uri: avatarUrl}}
                style={[styles.userProfilePic, avatarStyle]}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
              />
            )}
            <AppText transText={transTitle} presetStyle={'subHeading'} style={[styles.titleStyle, titleStyle]}>
              {title}
            </AppText>
          </View>
        )}
        {/* {avatarUrl && (
          <View
            style={[
              titleMode === 'center' && styles.titleCenter,
              titleMode === 'flex' && styles.titleFlex,
              titleMode === 'avatar' && styles.avatar,
              titleContainerStyle,
            ]}
            pointerEvents='none'>
            {avatarUrl && (
              <AppImage
                source={{uri: avatarUrl}}
                style={[styles.userProfilePic, avatarStyle]}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
              />
            )}
            <AppText transText={transTitle} presetStyle={'subHeading'} style={[styles.titleStyle, titleStyle]}>
              {title}
            </AppText>
          </View>
        )} */}

        <HeaderAction
          icon={rightIcon}
          iconColor={rightIconColor}
          onPress={onRightPress}
          backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
    </View>
  );
}
/*
 ** This style approach is used for synamic styles
 */
const $container = (headerColor: string): ViewStyle => {
  return {
    width: '100%',
    backgroundColor: headerColor,
    // paddingTop: topSpace - 20,
  };
};

const styles = StyleSheet.create({
  actionFillerConatiner: {
    width: 16,
  },
  actionIconContainer: {
    alignItems: 'center',
    flexGrow: 0,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    zIndex: 2,
  },
  avatar: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
  },
  contentContainerStyle: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: HEIGHT * 0.1,
    maxHeight: HEIGHT * 0.1,
  },
  mainContainer: {
    // backgroundColor: 'red',
    elevation: 5,
    paddingVertical: 5,
    shadowColor: COLORS.palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleCenter: {
    height: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.xxl,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  titleFlex: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  titleStyle: {
    textAlign: 'center',
  },

  userProfilePic: {
    borderRadius: 100,
    height: 50,
    marginHorizontal: 20,
    width: 50,
  },
});
