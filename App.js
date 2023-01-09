import { AppRegistry } from 'react-native';
import React from 'react';
import AppContainer from './index';

const App = () => {
  try {
    return <AppContainer />;
  } catch (e) {
    console.error(e);
  }
};

export default App;