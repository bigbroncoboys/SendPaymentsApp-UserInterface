import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ChargeScreen from '../screens/ChargeScreen';
import CreditCardScreen from '../screens/CreditCardScreen';
import EmployeesScreen from '../screens/EmployeesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ItemsScreen from '../screens/ItemsScreen';
import OrderScreen from '../screens/OrderScreen';

const AppNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        Register: RegisterScreen,
        Home: HomeScreen,
        Charge: ChargeScreen,
        CreditCard: CreditCardScreen,
        Employees: EmployeesScreen,
        Settings: SettingsScreen,
        Items: ItemsScreen,
        Order: OrderScreen
    },
    {
        initialRouteName: 'Login'
    }
);

export default createAppContainer(AppNavigator);