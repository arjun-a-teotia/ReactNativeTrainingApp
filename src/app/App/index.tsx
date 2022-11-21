import React, {ReactElement} from 'react';

import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  SplashScreen,
} from '../../screens';
import {RootStackParamList} from '../../navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): ReactElement => (
  <NavigationContainer>
    <StatusBar />
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'My Profile'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
