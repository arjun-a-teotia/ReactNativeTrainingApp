import React, {ReactElement, useLayoutEffect} from 'react';

import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {PokemonDetailRoute, RootStackNavigation} from 'src/navigation';

import styles from './index.styles';

const PokemonDetailScreen = (): ReactElement => {
  const route = useRoute<PokemonDetailRoute>();
  const navigation = useNavigation<RootStackNavigation>();

  const {name: pokemonName, url} = route.params.pokemon;

  const title = `${pokemonName} - Ratings`;

  useLayoutEffect(() => {
    navigation.setOptions({title: pokemonName.toUpperCase()});
  });

  return (
    <View>
      <Text style={styles.title}>Arjun</Text>
      <View style={styles.ratingItem}>
        <Text style={[styles.ratingText, styles.ratingHeader]}>Rating</Text>
        <Text style={[styles.ratingText, styles.ratingHeader]}>Percentage</Text>
      </View>
    </View>
  );
};

export {PokemonDetailScreen};
