import React, {ReactElement} from 'react';

import {StatusBar, Text} from 'react-native';

import {getStateFromPath, LinkingOptions, NavigationContainer, NavigationContainerProps} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  SplashScreen,
  PokemonDetailScreen,
} from '../../screens';
import {RootStackParamList} from '../../navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const config = {
  screens: {
    PokemonDetailScreen: {
      initialRouteName: 'SplashScreen',
      path: 'pokemonDetails/:name/:id',
      parse: {
        name: (name: string) => name.replace(/^@/, ''),
      }
    }
  }
};
const linking = {
  prefixes: ['mypokapp://'],
  config,
  getStateFromPath: (path: string, options: any) => {
    const state = getStateFromPath(path, options);
    const newState = {
      ...state,
      routes: state.routes.map(route => {
        if (route.name === 'PokemonDetailScreen') {
          // modify your params however you like here!
          return {
            ...route,
            params: { pokemon: {
              name: route.params?.name,
              url: "https://pokeapi.co/api/v2/pokemon/"+route.params?.id,
            } }
          }
        } else {
          return route
        }
      }),
    };
    console.log("arjun newState", newState);
    return newState;
  },
};
const App = (): ReactElement => (
  <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
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
        options={{title: 'Pokemon List'}}
      />
      <Stack.Screen
        name="PokemonDetailScreen"
        component={PokemonDetailScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
