// importa libraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//import screens
import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from './MainTab';
import Barber from '../screens/Barber';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
        headerShown: false
        }}
    >
        {/* Screens for the app */}
        <Stack.Screen name ="Preload" component={Preload} />
        <Stack.Screen name ="SignIn" component={SignIn} />
        <Stack.Screen name ="SignUp" component={SignUp} />
        <Stack.Screen name ="MainTab" component={MainTab} />
        <Stack.Screen name ="Barber" component={Barber} />
    </Stack.Navigator>
);