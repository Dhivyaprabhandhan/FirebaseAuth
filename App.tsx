import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './src';
import {theme} from './src/core/theme';
const Main = () => (
  console.log("pressed")
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
);

export default Main;
