import {API_KEY_DEV, API_KEY_PROD} from '@env';
export const API_KEY = process.env.NODE_ENV === 'development' ? API_KEY_DEV : API_KEY_PROD;
export const ASYNC_TOKEN_KEY = 'USER_TOKEN';
export const ASYNC_USER_DATA_KEY = 'USER_DATA';
export const USER_LANGUAGE = 'USER_LANGUAGE';
export const FALL_BACK_LANG = 'en-US';
