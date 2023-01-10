import { createAppContainer } from 'react-navigation';
import ScreenNavigator from './navigation/StackNavigator';

const AppContainer = createAppContainer(ScreenNavigator);

export default AppContainer;