import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {COLORS, Globaltypography, WIDTH} from '../../theme';

export default function AppButton(props: appBtnType): JSX.Element {
  /*
   ** Props
   */
  const {
    title = '',
    onPress,
    disabled = false,
    loading = false,
    loadingColor = COLORS.background,
    btnStyle = {},
    textStyle = {},
    activeOpacity = 0.8,
    children = null,
    smallBtn = false,
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[smallBtn ? styles.smallBtn : styles.largeBtn, btnStyle]}>
      {children && <View style={styles.childrenViewStyle}>{children}</View>}
      {title && (
        <Text style={[styles.title, textStyle]} numberOfLines={1}>
          {title}
        </Text>
      )}

      {loading && <ActivityIndicator color={loadingColor} style={styles.loading} size={'small'} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  childrenViewStyle: {
    marginRight: 20,
  },
  largeBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.buttonBorder,
    borderRadius: 8,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    marginTop: 20,
    width: WIDTH - 40,
    zIndex: 9,
  },
  loading: {marginLeft: 10},
  smallBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.button,
    borderRadius: 8,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    marginTop: 20,
    width: WIDTH * 0.4,
  },

  title: {
    ...Globaltypography.button,
    color: COLORS.buttonTextPrimary,
  },
});

interface appBtnType {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: string;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
  children?: JSX.Element | null;
  smallBtn?: boolean;
}
