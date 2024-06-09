import axios from 'axios';
import {API_KEY, ASYNC_TOKEN_KEY} from '../constants';
import Toast from 'react-native-simple-toast';
import {appUtils} from '../utils';
import {saveString} from '../utils/storage/storage';
import {useAppStore} from '../store';

// local storage

// seTting up base url
export const API = axios.create({
  baseURL: API_KEY,
});
export const AUTH_API = axios.create({
  baseURL: API_KEY,
});
console.log('🚀 ~ API:', API);
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
    console.log('🚀 ~ config:', config);
    // getting access token
    // const {tokens} = useStore.getState().auth;
    const {accessToken} = useAppStore.getState().tokens;
    // injecting our token into header
    config.headers.Authorization = `Bearer ${accessToken}`;
    // }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
/*
 ** When axios returns something
 */
API.interceptors.response.use(
  response => response.data,
  async error => {
    /*
     ** Original api that gets failed
     */
    const originalRequest = error.config;
    /*
     ** Checking if token gets expire
     */
    if (error.response && error.response.status === 401) {
      // Access token has expired, attempt to refresh
      const {refreshToken} = useAppStore.getState().tokens;

      try {
        const response = await AUTH_API.post('/refresh-token', {token: refreshToken});
        const {newAccessToken, newRefreshToken} = response.data;

        // Save new tokens
        useAppStore.setState({
          tokens: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });

        // Save tokens to local storage
        saveString(ASYNC_TOKEN_KEY, JSON.stringify({accessToken: newAccessToken, refreshToken: newRefreshToken}));

        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return API(originalRequest);
      } catch (refreshError: unknown | any) {
        appUtils.crashLogs(refreshError);
        Toast.show('Session expired. Please log in again.', Toast.LONG);
        return Promise.reject(refreshError);
      }
    }
    appUtils.crashLogs(error);
    return Promise.reject(error);
  },
);
/*
 ** When axios return something
 */
AUTH_API.interceptors.response.use(
  request => request.data,
  error => {
    appUtils.crashLogs(error);
    return Promise.reject(error);
  },
);
