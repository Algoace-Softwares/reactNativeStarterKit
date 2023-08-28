import axios from 'axios';
import {API_KEY, ASYNC_TOKEN_KEY} from '../constants';
import jwtDecode from 'jwt-decode';
import {store} from '../redux/store';
import Toast from 'react-native-simple-toast';
import {MMKV} from 'react-native-mmkv';
import {appUtils} from '../utils';

// local storage
export const storage = new MMKV();

// seTting up base url
export const API = axios.create({
  baseURL: '',
});
/*
 ** Before every api request following be taken
 1 - we are getting accessToken as well as refresh token from the api
 2 - then we are decoding accesToken by external library
 3 - then we are cheking the xpiry time for the token
 4 - if the token is expire then we calling api to get latest token from the server
 5 - if token is not expire we are simply injecting our accessToken into header
 */
/*
 **This mechnism every time when request gets
 */
API.interceptors.request.use(
  async function (config) {
    // getting access token
    const {tokens} = store.getState().auth;
    let {accessToken} = tokens;

    // decoded token data
    const decodedToken = jwtDecode(accessToken) as unknown as {exp: number};

    // extraction timme stamp
    const expiryTimestamp = new Date(decodedToken.exp * 1000);

    // chgecking if token expire
    if (expiryTimestamp < new Date()) {
      console.log('token expire');
      try {
        // if token expire get new token
        const response = await axios.post(`${API_KEY}/user/token`, {
          refreshToken: tokens.refreshToken,
        });
        console.log('RESPONSE[GET_NEW_TOKEN]', response);

        if (response?.status === 200) {
          // getting token from server data
          const newToken = response?.data?.tokens;
          // saving new tokens locally
          storage.set(ASYNC_TOKEN_KEY, JSON.stringify(newToken));
          //await AsyncStorage.setItem(ASYNC_TOKEN_KEY, JSON.stringify(newToken));

          accessToken = newToken?.accessToken;
        }

        // console.debug('Data returned', data);
      } catch (error) {
        Toast.show('Token expire unable to get new Token try again later', Toast.LONG);
        console.log('ERROR[UNABLE_TO_GET_TOKEN]', error);
      }
      // injecting our token into header
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
/*
 ** When axios return something
 */
API.interceptors.response.use(
  request => request,
  error => {
    appUtils.crashLogs(error);
    return Promise.reject(error);
  },
);
