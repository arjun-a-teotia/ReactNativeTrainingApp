import React, {ReactElement, useState} from 'react';

import {
  Image,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';

import {Ability, Pokedex, Stat} from '../../models';

import styles from './index.styles';

type PokemonListProps = {
  readonly pokemonDetails: Pokedex;
};

const PokemonDetail = ({pokemonDetails}: PokemonListProps): ReactElement => {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const pokemonLink = `mypokapp://pokemonDetails/@${pokemonDetails.name}/${pokemonDetails.id}`;

  const toggleQrCode = () => {
    setShowQRCode(!showQRCode);
  };

  const getAbilities = (abilities: Ability[]) => {
    let allAbilities = '';
    abilities.forEach((abilityData: Ability) => {
      allAbilities += abilityData.ability.name + ', ';
    });
    if (allAbilities.length > 1) {
      return allAbilities.slice(0, allAbilities.length - 2);
    }
  };
  const renderItem: ListRenderItem<Stat> = ({item: stats}) => {
    return (
      <View style={styles.ratingItem}>
        <Text style={[styles.ratingText, styles.lightText]}>
          {stats.stat.name}
        </Text>
        <Text style={[styles.ratingText]}>{stats.base_stat}</Text>
      </View>
    );
  };
  const renderDetails = () => {
    if (showQRCode) {
      return (
        <Image
          style={styles.qrCode}
          source={{
            uri: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+pokemonLink,
          }}
        />
      );
    }
    return (
      <>
        <View style={styles.ratingItem}>
          <Text style={[styles.ratingText, styles.lightText]}>Species</Text>
          <Text style={[styles.ratingText]}>{pokemonDetails.species.name}</Text>
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
            {pokemonDetails.height / 10} (M)
          </Text>
        </View>
        <View style={styles.ratingItem}>
          <Text style={[styles.ratingText, styles.lightText]}>Abilities</Text>
          <Text style={[styles.ratingText]}>
            {getAbilities(pokemonDetails.abilities)}
          </Text>
        </View>
        <Text style={styles.title}>Base Stats</Text>
        <FlatList data={pokemonDetails.stats} renderItem={renderItem} />
      </>
    );
  };
  if (!pokemonDetails) {
    return <Text>No pokemon details found.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={{
            uri: pokemonDetails.sprites.other['official-artwork'].front_default,
          }}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>About</Text>

        <TouchableOpacity
          style={styles.qrTextContainer}
          testID="toggleQrCode"
          onPress={toggleQrCode}>
          <Text style={styles.regText}>Show QR Code</Text>
        </TouchableOpacity>
        {renderDetails()}
      </View>
    </SafeAreaView>
  );
};

export {PokemonDetail};
