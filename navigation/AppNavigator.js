import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Register: RegisterScreen
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);