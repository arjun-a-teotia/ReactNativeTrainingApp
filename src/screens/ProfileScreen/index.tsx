import React, {ReactElement, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootStackNavigation} from '../../navigation';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import {Profile, PokemonList} from '../../components';
import {Pokemon, PokemonParam} from '../../models';
import {getPokemon} from '../../api';

const ProfileScreen = (): ReactElement => {
  const [offset, setOffset] = useState<number>(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [showLoader, setshowLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigation = useNavigation<RootStackNavigation>();
  const route = useRoute();
  console.log("arjunParam in ProfileScreen", route.params);

  useEffect(() => {
    hitGetPokemonApi();
  }, [route.params]); // eslint-disable-line react-hooks/exhaustive-deps
  const hitGetPokemonApi = async () => {
    const params = route.params as PokemonParam;
    if(params) {
      console.log("paramsGood", params);
      return navigation.navigate('PokemonDetailScreen', params);
    }
    try {
      setshowLoader(true);
      const newPokemons = await getPokemon(offset);
      /* istanbul ignore else */
      if (pokemons && newPokemons) {
        setPokemons(pokemons.concat(newPokemons));
      } else if (newPokemons) {
        setPokemons(newPokemons);
      }
      setOffset(offset + 20);
      setshowLoader(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage((error as Error).message);
      setshowLoader(false);
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
  const renderLoaderAndError = () => {
    if (errorMessage) {
      return <Text>{errorMessage}</Text>;
    }
    if (showLoader) {
      return <ActivityIndicator size={'large'} testID="activity-indicator" />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Profile
        heading={'Welcome ' + auth().currentUser?.email}
        onLogout={onLogout}
        isProfileScreen={true}
      />
      <PokemonList
        pokemons={pokemons}
        onSelectPokemon={onSelectPokemon}
        onEndReached={hitGetPokemonApi}
      />
      {renderLoaderAndError()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export {ProfileScreen};
