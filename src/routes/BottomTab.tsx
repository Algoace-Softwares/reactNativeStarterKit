import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, ViewStyle} from 'react-native';
import {TabScreens} from '../data';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabNavigatorParamList, tabBarIconType} from './types.navigation';
import {CustomTheme, Globaltypography} from '../theme';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

// function for tab bar icon redering
const TabBarIconFunc = ({color, size, item}: tabBarIconType) => {
  return <item.tabBarIcon color={color} width={size} heigth={size} />;
};

const BottomTab = (): JSX.Element => {
  /*
   ** Hooks
   */
  const insets = useSafeAreaInsets();
  const {colors} = useTheme() as CustomTheme;

  return (
    <Tab.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.palette.primary400,
        tabBarInactiveTintColor: colors.palette.secondary400,
        tabBarLabelStyle: {marginBottom: 5},
        tabBarStyle: $tabBarStyle(insets.bottom),
      }}>
      {TabScreens.map((item, index) => (
        <Tab.Screen
          key={`index-${index}`}
          name={item.name as keyof BottomTabNavigatorParamList}
          component={item.component}
          options={{
            tabBarIcon: ({color, size}) => TabBarIconFunc({color, size, item}),
            tabBarLabel: item.tabBarLabel,
            tabBarLabelStyle: styles.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    ...Globaltypography.formLabel,
  },
});
/*
 ** Dynamic styles
 */
const $tabBarStyle = (bottomSpace: number): ViewStyle => {
  return {
    height: 55 + Number(bottomSpace),
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  };
};

export default BottomTab;
