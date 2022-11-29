import React, {ReactElement, useEffect, useState} from 'react';
import {ActivityIndicator, Platform, SafeAreaView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigation} from '../../navigation';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import {Profile, PokemonList} from '../../components';
import {Pokemon} from '../../models';
import {getPokemon} from '../../api';

const ProfileScreen = (): ReactElement => {
  const [offset, setOffset] = useState<number>(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    hitGetPokemonApi();
  }, []);
  const hitGetPokemonApi = async () => {
    try {
      const newPokemons = await getPokemon(offset);
      if (newPokemons) {
        setPokemons(pokemons.concat(newPokemons));
      }
      setOffset(offset + 20);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  const onLogout = async () => {
    await analytics().logEvent(
      'TrainingApp_Profile_logout_btn_click_' + Platform.OS,
    );
    auth()
      .signOut()
      .then(() => {
        /* istanbul ignore next */
        navigation.dispatch(StackActions.replace('LoginScreen'));
      });
  };

  const onSelectPokemon = (pokemon: Pokemon) => {
    navigation.navigate('PokemonDetailScreen', {pokemon});
  };
  const renderPokemonList = () => {
    if (errorMessage) {
      return <Text>{errorMessage}</Text>;
    }
    if (!pokemons) {
      return <ActivityIndicator testID="activity-indicator" />;
    }
    return (
      <PokemonList
        pokemons={pokemons}
        onSelectPokemon={onSelectPokemon}
        onEndReached={hitGetPokemonApi}
      />
    );
  };

  return (
    <SafeAreaView>
      <Profile
        heading={'Welcome ' + auth().currentUser?.email}
        onLogout={onLogout}
        isProfileScreen={true}
      />
      {renderPokemonList()}
    </SafeAreaView>
  );
};

export {ProfileScreen};
