import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChargeScreen from '../screens/ChargeScreen';
import CreditCardScreen from "../screens/CreditCardScreen";

const AppNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        Register: RegisterScreen,
        Charge: ChargeScreen,
        CreditCard: CreditCardScreen
    },
    {
        initialRouteName: 'Login'
    }
);

export default createAppContainer(AppNavigator);