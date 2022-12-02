import React, {ReactElement} from 'react';
import 'react-native-gesture-handler';
import {StatusBar, Text} from 'react-native';

import {getStateFromPath, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  SplashScreen,
  PokemonDetailScreen,
} from '../../screens';
import {RootStackParamList} from '../../navigation';
import {PokemonLink} from '../../models';

const Stack = createNativeStackNavigator<RootStackParamList>();
const config = {
  screens: {
    PokemonDetailScreen: {
      path: 'pokemonDetails/:name/:id',
      parse: {
        name: (name: string) => name.replace(/^@/, ''),
      },
    },
  },
};
const linking = {
  prefixes: ['mypokapp://'],
  config,
  getStateFromPath: (path: string, options: any) => {
    const state = getStateFromPath(path, options);
    if (!state) {
      return state;
    }
    const newState = {
      ...state,
      routes: state.routes.map(route => {
        if (route.name === 'PokemonDetailScreen') {
          try {
            // modify your params however you like here!
            const params = route.params as PokemonLink;
            return {
              ...route,
              params: {
                pokemon: {
                  name: params.name,
                  url: 'https://pokeapi.co/api/v2/pokemon/' + params.id,
                },
              },
            };
          } catch (error) {
            console.log(error);
            return route;
          }
        } else {
          return route;
        }
      }),
    };

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
