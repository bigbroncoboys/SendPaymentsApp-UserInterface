import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ChargeScreen from '../screens/ChargeScreen';
import PaymentScreen from '../screens/PaymentScreen';
import EmployeesScreen from '../screens/EmployeesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ItemsScreen from '../screens/ItemsScreen';
import QRCodeScreen from "../screens/QRCodeScreen";

const AppNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        Register: RegisterScreen,
        Home: HomeScreen,
        Charge: ChargeScreen,
        Payment: PaymentScreen,
        Employees: EmployeesScreen,
        Settings: SettingsScreen,
        Items: ItemsScreen,
        QRCode: QRCodeScreen,
    },
    {
        initialRouteName: 'Login'
    }
);

export default createAppContainer(AppNavigator);