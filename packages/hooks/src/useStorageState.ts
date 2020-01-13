import { useState } from 'react';
import { isServer } from './util';

/**
 *
 */
export function useStorageState<T>(
  key: string,
  defaultValue: T,
  storage: Storage
): [T, (newValue: T) => void] {
  const rawValue = storage.getItem(key);
  const saveItem = (newValue: T) => {
    storage.setItem(key, JSON.stringify(newValue));
    return newValue;
  };

  const retrieved =
    rawValue === null ? saveItem(defaultValue) : (JSON.parse(rawValue) as T);
  const [value, setValue] = useState(retrieved);

  const setAndSaveValue = (newValue: T) => {
    saveItem(newValue);
    setValue(newValue);
  };

  return [value, setAndSaveValue];
}

export function useSessionStorageState<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] {
  if (isServer()) {
    return [defaultValue, () => {}];
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useStorageState(key, defaultValue, sessionStorage);
}

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] {
  if (isServer()) {
    return [defaultValue, () => {}];
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useStorageState(key, defaultValue, localStorage);
}
