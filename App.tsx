import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './src';
import {theme} from './src/core/theme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import usersReducer from './src/redux/Store';
import auth from '@react-native-firebase/auth';

const store = createStore(usersReducer);

console.log('store-->', store.getState());
const Main = () => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  </Provider>
);

export default Main;
