/**
 * @format
 */

import 'react-native';
import React from 'react';
import {PokemonDetail} from './index';

// Note: test renderer must be required after react-native.
import {fireEvent, render} from '@testing-library/react-native';
import {Pokedex} from '../../models';
const mockNavigate = jest.fn();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');

  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const pokemonDetails: Pokedex = {
  abilities: [
    {
      ability: {
        name: 'intimidate',
        url: 'https://pokeapi.co/api/v2/ability/22/',
      },
      is_hidden: false,
      slot: 1,
    },
  ],
  base_experience: null,
  forms: [
    {
      name: 'wyrdeer',
      url: 'https://pokeapi.co/api/v2/pokemon-form/899/',
    },
  ],
  game_indices: [],
  height: 18,
  held_items: [],
  id: 899,
  is_default: true,
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/899/encounters',
  moves: [],
  name: 'wyrdeer',
  order: -1,
  past_types: [],
  species: {
    name: 'wyrdeer',
    url: 'https://pokeapi.co/api/v2/pokemon-species/899/',
  },
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/899.png',
      },
    },
  },
  stats: [
    {
      base_stat: 103,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'normal',
        url: 'https://pokeapi.co/api/v2/type/1/',
      },
    },
  ],
  weight: 951,
};
describe('Pokemon detail component', () => {
  it('check QR code button click', async () => {
    const {queryByText, getByTestId, getByText} = render(
      <PokemonDetail pokemonDetails={pokemonDetails} />,
    );
    expect(getByText('intimidate')).toBeTruthy(); //abilities
    fireEvent.press(getByTestId('toggleQrCode'));
    const details = queryByText('intimidate');

    expect(details).toBeNull(); // it doesn't exist
  });
});
