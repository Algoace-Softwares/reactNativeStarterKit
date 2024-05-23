import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {GlobalStyles, COLORS} from '../assets';
import {TabScreens} from '../data';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabNavigatorParamList, tabBarIconType} from './types.navigation';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

// function for tab bar icon redering
const TabBarIconFunc = ({color, size, item}: tabBarIconType) => {
  return <item.tabBarIcon color={color} width={size} heigth={size} />;
};

const BottomTab = (): JSX.Element => {
  // hooks
  const insets = useSafeAreaInsets();

  // rendring
  return (
    <Tab.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.seconday,
        tabBarLabelStyle: {marginBottom: 5},
        tabBarStyle: styles(insets.bottom).tabBarStyle,
      }}>
      {TabScreens.map((item, index) => (
        <Tab.Screen
          key={`index-${index}`}
          name={item.name as keyof BottomTabNavigatorParamList}
          component={item.component}
          options={{
            tabBarIcon: ({color, size}) => TabBarIconFunc({color, size, item}),
            tabBarLabel: item.tabBarLabel,
            tabBarLabelStyle: styles().label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = (bottomValue?: number) =>
  StyleSheet.create({
    tabBarStyle: {
      height: 55 + Number(bottomValue),
      shadowColor: '#000000',
      shadowOffset: {
        width: 5,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
    },
    label: {
      ...GlobalStyles.l2,
    },
  });

export default BottomTab;
