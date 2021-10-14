import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar, useColorScheme } from "react-native";
import { BaseColor } from "@config";
import AppLoading from "expo-app-loading";

import * as Font from 'expo-font'

import Router from './navigation/route';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store/store'

export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
  });

  const fetchFonts = () => {
    return Font.loadAsync({
      'Raleway': require('./assets/fonts/Raleway-Black.ttf')
    });
  };

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)} />
    )
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}


