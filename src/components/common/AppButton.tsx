import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {WIDTH, COLORS, GlobalStyles} from '../../assets';

export default function AppButton(props: appBtnType): JSX.Element {
  /*
   ** Props
   */
  const {
    title = '',
    onPress,
    disabled = false,
    loading = false,
    loadingColor = COLORS.white,
    btnStyle = {},
    textStyle = {},
    activeOpacity = 0.8,
    children = null,
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[styles.btn, btnStyle]}>
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
  btn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    marginTop: 20,
    width: WIDTH - 40,
    zIndex: 9,
  },
  childrenViewStyle: {
    marginRight: 20,
  },
  loading: {marginLeft: 10},

  title: {
    ...GlobalStyles.l1,
    color: COLORS.white,
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
}
