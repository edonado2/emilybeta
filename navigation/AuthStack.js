import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import RegisterScreen from '../screens/SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('alreadylaunched').then((value) => {
            if (value === null) {
                AsyncStorage.setItem('alreadylaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
    }, []);

    if (isFirstLaunch === null) {
        return null;
    }

    return (

        <Stack.Navigator initialRouteName={isFirstLaunch ? 'Onboarding' : 'Login'}>
            {isFirstLaunch && (
                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                    options={{ headerShown: false }}
                />
            )}
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
}

export default AuthStack
