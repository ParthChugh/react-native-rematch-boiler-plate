/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import store from './store';
import Container from './Container';
import FlashMessage from 'react-native-flash-message';
import './src/constants/colors';
import './src/constants/typography';
import './src/assets/images';
import './MockData';


const App = () => {
  return (
    <MenuProvider>
      <React.StrictMode>
        <Provider store={store}>
          <StatusBar barStyle={'dark-content'} backgroundColor="white" />
          <Container />
          <FlashMessage position="top" />
        </Provider>
      </React.StrictMode>
    </MenuProvider>
  );
};

export default App;
