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
  readonly onEndReached?: () => void;
};

const PokemonList = ({
  pokemons,
  onSelectPokemon = undefined,
  onEndReached = undefined,
}: PokemonListProps): ReactElement => {
  if (pokemons.length === 0) {
    return <Text>No pokemon found.</Text>;
  }

  const renderItem: ListRenderItem<Pokemon> = ({item: pokemon, index}) => {
    return (
      <TouchableWithoutFeedback onPress={() => onSelectPokemon?.(pokemon)}>
        <View style={styles.item}>
          <Text style={styles.itemText} key={pokemon.url} testID={pokemon.name}>
            {index + 1}. {pokemon.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      <Text style={styles.heading}>Pokemon Name List</Text>
      <FlatList data={pokemons} renderItem={renderItem} onEndReached={onEndReached} />
    </>
  );
};

export {PokemonList};
