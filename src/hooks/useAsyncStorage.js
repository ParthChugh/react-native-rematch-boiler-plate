import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key, initialValue = {}) => {
  const [storedValue, setStoredValue] = useState();

  async function getStoredItem(updatedKey, initial) {
    try {
      const item = await AsyncStorage.getItem(updatedKey);
      const value = item ? JSON.parse(item) : initial;
      setStoredValue(value);
    } catch (error) {}
  }

  useEffect(() => {
    getStoredItem(key, initialValue);
  }, []);

  const setValue = async valueToStore => {
    try {
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore || {}));
    } catch (error) {}
  };

  return [storedValue, setValue];
};

export default useAsyncStorage;
