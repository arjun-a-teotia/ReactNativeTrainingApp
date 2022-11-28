import React, {ReactElement, useEffect, useState} from 'react';
import {ActivityIndicator, Platform, Text} from 'react-native';
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
  const [pokemons, setPokemons] = useState<readonly Pokemon[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    const hitGetPokemonApi = async () => {
      try {
        setPokemons(await getPokemon(offset));
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    };

    hitGetPokemonApi();
  }, []);

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
      <PokemonList pokemons={pokemons} onSelectPokemon={onSelectPokemon} />
    );
  };

  return (
    <>
      <Profile
        heading={'Welcome ' + auth().currentUser?.email}
        onLogout={onLogout}
        isProfileScreen={true}
      />
      {renderPokemonList()}
    </>
  );
};

export {ProfileScreen};
