import React, {ReactElement, useEffect, useLayoutEffect, useState} from 'react';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {getPokemonDetails} from '../../api';
import {PokemonDetailRoute, RootStackNavigation} from '../../navigation';
import {Pokedex} from '../../models';
import {PokemonDetail} from '../../components/PokemonDetail';
import {ActivityIndicator, Text} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';

const PokemonDetailScreen = (): ReactElement => {
  const [showLoader, setshowLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [pokemonDetails, setPokemonDetails] = useState<Pokedex>();
  const route = useRoute<PokemonDetailRoute>();
  const navigation = useNavigation<RootStackNavigation>();
  const {name: pokemonName, url: pokemonDetailsURL} = route.params.pokemon;

  /* istanbul ignore next */
  const leftHeaderDeeplink = () => {
    return (
      <HeaderBackButton
        onPress={() =>
          navigation.dispatch(StackActions.replace('ProfileScreen'))
        }
      />
    );
  };

  useLayoutEffect(() => {
    if (!navigation.canGoBack()) {
      navigation.setOptions({
        title: pokemonName.toUpperCase(),
        headerLeft: leftHeaderDeeplink,
      });
    } else {
      navigation.setOptions({title: pokemonName.toUpperCase()});
    }
  });
  useEffect(() => {
    hitGetPokemonDetailsApi();
  }, [route.params.pokemon]); // eslint-disable-line react-hooks/exhaustive-deps
  const hitGetPokemonDetailsApi = async () => {
    try {
      setshowLoader(true);
      const pokemonData: Pokedex = await getPokemonDetails(pokemonDetailsURL);
      setPokemonDetails(pokemonData);
      setshowLoader(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage((error as Error).message);
      setshowLoader(false);
    }
  };

  const renderLoaderAndError = () => {
    if (errorMessage) {
      return <Text>{errorMessage}</Text>;
    }
    if (showLoader) {
      return <ActivityIndicator size={'large'} testID="activity-indicator" />;
    }
    return null;
  };
  const renderPokemonDetails = () => {
    if (pokemonDetails) {
      return <PokemonDetail pokemonDetails={pokemonDetails} />;
    }
  };
  return (
    <>
      {renderPokemonDetails()}
      {renderLoaderAndError()}
    </>
  );
};

export {PokemonDetailScreen};
