import { createStackNavigator } from 'react-navigation-stack';
import HomeSearchBar from '../screens/HomeSearchBar';
import OutputScreen from '../screens/OutputScreen';

const ScreenNavigator = createStackNavigator(
    {
        Home: HomeSearchBar,
        Output: OutputScreen,
    },
    {
        initialRouteName: 'Home',
    }
);

export default ScreenNavigator;
