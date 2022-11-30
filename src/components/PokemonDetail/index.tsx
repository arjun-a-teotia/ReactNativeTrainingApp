import React, {ReactElement} from 'react';

import {Image, ScrollView, Text, View, SafeAreaView} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {Ability, Pokedex} from '../../models';

import styles from './index.styles';

type PokemonListProps = {
  readonly pokemonDetails: undefined | Pokedex;
};

const PokemonDetail = ({pokemonDetails}: PokemonListProps): ReactElement => {
  const getAbilities = (abilities: Ability[]) => {
    let allAbilities = '';
    abilities.forEach((abilityData: Ability) => {
      allAbilities += abilityData.ability.name + ', ';
    });
    if (allAbilities.length > 1) {
      return allAbilities.slice(0, allAbilities.length - 2);
    } else {
      return '';
    }
  };
  if (!pokemonDetails) {
    return <Text>No pokemon details found.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={{
              uri: pokemonDetails.sprites.other['official-artwork'][
                'front_default'
              ],
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>About</Text>
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingText, styles.lightText]}>Species</Text>
            <Text style={[styles.ratingText]}>
              {pokemonDetails.species.name}
            </Text>
          </View>
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingText, styles.lightText]}>Weight</Text>
            <Text style={[styles.ratingText]}>
              {pokemonDetails.weight / 10} (Kg)
            </Text>
          </View>
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingText, styles.lightText]}>Height</Text>
            <Text style={[styles.ratingText]}>
              {pokemonDetails.height / 10} (m)
            </Text>
          </View>
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingText, styles.lightText]}>Abilities</Text>
            <Text style={[styles.ratingText]}>
              {getAbilities(pokemonDetails.abilities)}
            </Text>
          </View>
          <Text style={styles.title}>Base Stats</Text>
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingText, styles.lightText]}>Species</Text>
            <Text style={[styles.ratingText]}>
              {pokemonDetails.species.name}
            </Text>
          </View>
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingText, styles.lightText]}>Weight</Text>
            <Text style={[styles.ratingText]}>
              {pokemonDetails.weight / 10} (Kg)
            </Text>
          </View>
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingText, styles.lightText]}>Height</Text>
            <Text style={[styles.ratingText]}>
              {pokemonDetails.height / 10} (m)
            </Text>
          </View>
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingText, styles.lightText]}>Abilities</Text>
            <Text style={[styles.ratingText]}>
              {getAbilities(pokemonDetails.abilities)}
            </Text>
          </View>
          <QRCode value="arjun" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {PokemonDetail};
