import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OutputScreen from '../screens/OutputScreen';
import HomeSearchBar from '../screens/HomeSearchBar';

const Stack = createStackNavigator();


const AppStack = ({ navigation }) => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeSearchBar}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Output"
                component={OutputScreen}
                options={{ headerShown: false }}

            />
        </Stack.Navigator>
    )

};




export default AppStack;

