import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/containers/home';

const AppNavigator = createStackNavigator({
    Home
},{
    headerMode: 'none',
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
