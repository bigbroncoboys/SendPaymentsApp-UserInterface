import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChargeScreen from '../screens/ChargeScreen';
import CreditCardScreen from "../screens/CreditCardScreen";

const switchNavigator = createSwitchNavigator(
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  {
    Home: HomeScreen,
    Register: RegisterScreen,
    Charge: ChargeScreen,
    CreditCard: CreditCardScreen
  },
  {
    initialRouteName: 'Home'
  }
);
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
