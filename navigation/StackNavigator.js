import { createStackNavigator } from 'react-navigation-stack';
import HomeSearchBar from '../screens/HomeSearchBar';
import OutputScreen from '../screens/OutputScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/SignUpScreen';
import OnboardingScreen from '../screens/OnboardingScreen';


const StackNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        },
    },

    Onboarding: {
        screen: OnboardingScreen,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            title: "Registro"
        },
    },
    Home: {
        screen: HomeSearchBar,
        navigationOptions: {
            header: null,
        },
    },
    Output: {
        screen: OutputScreen,
        navigationOptions: {
            header: null,
        },
    },
},
    {
        initialRouteName: 'Onboarding',
    });

export default StackNavigator;
