import { createAppContainer } from 'react-navigation';
import ScreenNavigator from './navigation/ScreenNavigator';

const AppContainer = createAppContainer(ScreenNavigator);

export default AppContainer;