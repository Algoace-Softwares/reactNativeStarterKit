import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {SVG} from '../../assets';

export type IconTypes = keyof typeof SVG;

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  width?: number;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  height?: number;
  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<TouchableOpacity>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps['onPress'];
}

export function AppIcon(props: IconProps) {
  const {icon, color, height, width, containerStyle: $containerStyleOverride, ...IconProps} = props;

  return (
    <TouchableOpacity
      accessibilityRole={isPressable ? 'imagebutton' : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}></TouchableOpacity>
  );
}
