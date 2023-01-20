import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import StackNavigator from './navigation/StackNavigator';

const AppContainer = createAppContainer(StackNavigator);

const App = () => {
  try {
    return (
      <AppContainer />
    );
  } catch (e) {
    console.error(e);
    return (
      <View>
        <Text>An error occurred</Text>
      </View>
    )
  }
}

export default App;