import axios from 'axios';
import {API_KEY} from '../constants';
import Toast from 'react-native-simple-toast';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {useAppStore} from '../store';
import {tokenType} from '../store/slices/type';

// local storage

// SeTTing up base url

export const API = axios.create({
  baseURL: API_KEY,
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
 ** This mechnism every time when request gets
 */
API.interceptors.request.use(
  async function (config) {
    console.log('🚀 ~ config:', config);
    // getting access token
    let {accessToken, refreshToken} = useAppStore.getState().tokens;
    console.log('🚀 ~ accessToken:', accessToken);
    if (accessToken) {
      // decoded token data
      const decodedToken = jwtDecode<JwtPayload>(accessToken);
      console.log('🚀 ~ decodedToken:', decodedToken);
      if (decodedToken.exp) {
        // extraction timme stamp
        const expiryTimestamp = new Date(decodedToken.exp * 1000);

        // chgecking if token expire
        if (expiryTimestamp < new Date()) {
          console.log('token expire');
          try {
            // if token expire get new token
            const response = await axios.post(`${API_KEY}/user/token`, {
              refreshToken,
            });
            console.log('RESPONSE[GET_NEW_TOKEN]', response);

            if (response?.status === 200) {
              // getting token from server data
              const newToken = response?.data?.tokens;

              // saving token
              useAppStore.getState().updateToken(newToken as tokenType);

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
      }
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
  request => request?.data,
  error => {
    return Promise.reject(error);
  },
);
