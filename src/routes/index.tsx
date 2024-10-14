import React, {useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {authScreens, homeScreens} from '../data';
import {AuthStackParamList, HomeStackParamList, RootStackParamList} from './types.navigation';
import {useBackButtonHandler, navigationRef} from './navigationUtilities';
import BaseConfig from '../config';
import {NavigationContainer} from '@react-navigation/native';
import {AppState, useColorScheme} from 'react-native';
import {DARK_COLORS, DEFAULT_COLORS} from '../theme';
import {useAppStore} from '../store';
import {fetchUserDataLocal} from '../store/authSlice/authApiService';
import socketio from 'socket.io-client';
import {ChatEventEnum} from '../@types';
/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = BaseConfig.exitRoutes;
/*
 ** Auth stack and navigator for rest of the screen
 */
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AuthStackScreens = (): JSX.Element => {
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
 ** Home stack and navigator for rest of the screen
 */
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeStackScreens = (): JSX.Element => {
  /*
   **  Hooks
   */
  const userData = useAppStore(state => state.userData);
  const setSocket = useAppStore(state => state.setSocket);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    /*
     ** initializing socket instance
     */
    const socketInstance = socketio('ws://localhost:8000', {
      transports: ['websocket'],
    });

    console.log('socketInstance:', socketInstance);

    // setting up on state variable
    setSocket(socketInstance);

    console.log('emitting socket');

    // emitting event to know the server this user is connected and ready for emitting or listeining events
    socketInstance?.emit(ChatEventEnum.CONNECTED_EVENT, {
      userId: userData?._id,
      name: userData?.name,
      nickName: userData?.nickName,
    });

    socketInstance.on(ChatEventEnum.DISCONNECT_EVENT, (reason, details) => {
      console.log('diconnect:', reason, details);
    });
    socketInstance.on(ChatEventEnum.CONNECTION_EVENT, () => {
      console.log('user connected');
    });
    socketInstance.on(ChatEventEnum.SERVER_MESSAGE, (message: string) => {
      console.log('server message:', message);
    });

    return () => {
      socketInstance.disconnect();
      socketInstance.off(ChatEventEnum.CONNECTION_EVENT);
      socketInstance.off(ChatEventEnum.DISCONNECT_EVENT);
      socketInstance.off(ChatEventEnum.SERVER_MESSAGE);
    };
  }, [userData, setSocket]);
  // for handling bausines logic when app is going on foreground/background/killed state
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // console.log('🚀 ~ subscription ~ AppState.currentState):', AppState.currentState);
      // console.log('🚀 ~ subscription ~ nextAppState:', nextAppState);

      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <HomeStack.Navigator>
      {homeScreens.map(item => {
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
 ** Root stack and navigator
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = (): JSX.Element => {
  /*
   **  Hooks
   */

  const userData = useAppStore(state => state.userData);

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
    // Fetching user data from local
    // const fetchUserData = async () => {
    //   try {
    //     const user = loadStorage(ASYNC_USER_DATA_KEY) as userDataType;
    //     const userToken = loadStorage(ASYNC_TOKEN_KEY) as tokenType;

    //     console.log('🚀 ~ fetchUserDataLocal: ~ user:', user);
    //     console.log('🚀 ~ fetchUserDataLocal: ~ userToken:', userToken);
    //   } catch (error: any) {
    //     console.log('🚀 ~ fetchUserDataLocal: ~ error:', error);
    //   }
    // };
    fetchUserDataLocal().then(date => console.log('hidihng splash screen here', date));
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
  /*
   **  Hooks
   */
  const theme = useColorScheme();
  /*
   ** Back handler for android
   */
  useBackButtonHandler(routeName => exitRoutes.includes(routeName));
  /*
   ** Constucting theme according to deafult mobile theme
   */
  const MyTheme = {
    dark: theme === 'dark' && true,
    colors: theme === 'dark' ? {...DARK_COLORS} : {...DEFAULT_COLORS},
  };

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}
