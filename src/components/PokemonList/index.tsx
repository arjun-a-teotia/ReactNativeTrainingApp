import React, {ReactElement} from 'react';

import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Pokemon} from 'src/models';

import styles from './index.styles';

type PokemonListProps = {
  readonly pokemons: readonly Pokemon[];
  readonly onSelectPokemon?: (pokemon: Pokemon) => void;
};

const PokemonList = ({
  pokemons,
  onSelectPokemon = undefined,
}: PokemonListProps): ReactElement => {
  if (pokemons.length === 0) {
    return <Text>No pokemon found.</Text>;
  }

  const renderItem: ListRenderItem<Pokemon> = ({item: pokemon}) => {
    // const { id, name } = authority;

    return (
      <TouchableWithoutFeedback onPress={() => onSelectPokemon?.(pokemon)}>
        <View style={styles.item}>
          <Text style={styles.itemText} key={pokemon.url}>
            {pokemon.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return <FlatList data={pokemons} renderItem={renderItem} />;
};

export {PokemonList};
