import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Appstack from './navigation/AppStack';
import { AuthProvider } from './navigation/AuthProvider';
import Routes from './navigation/Routes';


const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
};

export default App;



