import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {GlobalStyles} from '../assets';
import {authScreens, homeScreen} from '../data';
import RNBootSplash from 'react-native-bootsplash';

import {AuthStackParamList, HomeStackParamList, RootStackParamList} from './types.navigation';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHooks';
import {fetchDataFromLocalStorage} from '../redux/features/auth/authSlice';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList {}
    interface RootParamList extends HomeStackParamList {}
  }
}

// export type onBoardingProps = NativeStackNavigationProp<RootStackParamList>;
// export type onBoardingScreenProps = NativeStackScreenProps<
//   RootStackParamList,
//   'onBoardingScreen'
// >;

/*
 ** Auth stack and navigator for rest of the screen
 */
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator>
      {authScreens.map(item => {
        return (
          <AuthStack.Screen
            key={item.id}
            name={item.screenName as keyof AuthStackParamList}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </AuthStack.Navigator>
  );
};

/*
 **Home stack and navigator for rest of the screen
 */
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator>
      {homeScreen.map(item => {
        return (
          <HomeStack.Screen
            key={item.id}
            name={item.screenName as keyof HomeStackParamList}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </HomeStack.Navigator>
  );
};
/*
 **Root stack and navigator
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = (): JSX.Element => {
  const [userData] = useState(null);
  //hooks
  // const {userData} = useAppSelector(state => state.auth);
  // const dispatch = useAppDispatch();
  /*
   ** check is user signed in or not
   */
  // life cycles methods
  useEffect(() => {
    /* *
    your logic for checking if user logged in or not  you need to get the token from asnyc
    then your check if userData is their user is logged then but before showing to homeStack
    your need to check the is token is expired or not if expired then your need to fetch another token
    by using refresh token
    1 step: check if you got accessToken in async or not if no this mean user is not signed in
    2 step: if you find accessToken and userData this mean user is logged in but we still need to update our data
    3 step: we make a api call to get latest userData from server and save it on async as well as on state varaible
    4 step: we hide splash screen
     */
    // dispatch(fetchDataFromLocalStorage())
    //   .then(data => {
    //     console.debug('data is :', data);
    //     RNBootSplash.hide();
    //   })
    //   .catch(e => {
    //     RNBootSplash.hide();
    //     console.log('error is:', e);
    //   });
  }, []);

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={userData ? 'HomeStackScreens' : 'AuthStackScreens'}
        component={userData ? HomeStackScreens : AuthStackScreens}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

/*
 ** Main navigator
 */
export default function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 35}
        style={GlobalStyles.mainContainer}>
        <RootNavigator />
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}
