import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChargeScreen from '../screens/ChargeScreen';

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Register: RegisterScreen,
        Charge: ChargeScreen
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);