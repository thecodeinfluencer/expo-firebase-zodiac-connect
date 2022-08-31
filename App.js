import { useFonts } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import authSlice from './redux/slices/authSlice';
import dataSlice from './redux/slices/dataSlice';
import Routes from './Routes';

const storeName = '@zodiacv1';

export default function App() {
  const [persistedStorage, setPersistedStorage] = useState({});

  const store = configureStore({
    reducer: {
      data: dataSlice,
      auth: authSlice,
    },
    preloadedState: persistedStorage,
  });

  const saveToAsyncStorage = async state => {
    try {
      const stringState = JSON.stringify(state);
      await AsyncStorage.setItem(storeName, stringState);
    } catch (err) {
      console?.log('Error saving state to async storage: ', err);
    }
  };

  const loadFromAsyncStorage = async () => {
    try {
      const stringState = await AsyncStorage.getItem(storeName);
      if (stringState === null) return undefined;
      setPersistedStorage(JSON.parse(stringState));
      return JSON.parse(stringState);
    } catch (err) {
      return undefined;
    }
  };

  useEffect(() => {
    loadFromAsyncStorage();
  }, []);

  store.subscribe(() => saveToAsyncStorage(store.getState()));

  let [fontsLoaded] = useFonts({
    Nunito: require('./assets/fonts/Nunito.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
