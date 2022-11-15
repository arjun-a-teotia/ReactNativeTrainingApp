import React, { ReactElement } from 'react';

import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from 'src/screens';
import { RootStackParamList } from 'src/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): ReactElement => (
    <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: 'Login' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
