import {MMKV} from 'react-native-mmkv';
import {appUtils} from '..';
// local storage
const storage = new MMKV();
/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    const value = storage.getString(key);
    if (value) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    appUtils.crashLogs({functionName: 'loadString', error, filename: 'storage'});
    throw new Error('Unable to fetch value');
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    storage.set(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load<T>(key: string): Promise<T | null> {
  try {
    const value = storage.getString(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return '' as T;
    }
  } catch (error) {
    appUtils.crashLogs({functionName: 'loadString', error, filename: 'storage'});
    throw new Error('Unable to fetch value');
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: string | boolean): Promise<boolean> {
  try {
    storage.set(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<boolean> {
  try {
    storage.delete(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<boolean> {
  try {
    storage.clearAll();
    return true;
  } catch {
    return false;
  }
}
