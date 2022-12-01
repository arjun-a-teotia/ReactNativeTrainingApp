/**
 * @format
 */

import 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
// Note: test renderer must be required after react-native.
import {render, waitFor} from '@testing-library/react-native';
import {getPokemonDetails} from '../../api';
import {Pokedex, Pokemon} from '../../models';
import {PokemonDetailScreen} from './index';
import 'react-native-gesture-handler/jestSetup';
const apiURL = 'https://pokeapi.co/api/v2/pokemon/899/';
const pokemonName = 'wyrdeer';

jest.useFakeTimers();
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native');
// jest.mock('@react-navigation/elements');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('src/api');
const pokemonRouteParams: Pokemon = {
  name: pokemonName,
  url: apiURL,
};
describe('Profile Screen Testing', () => {
  const mockUseNavigation = useNavigation as jest.Mock;
  const mockUseRoute = useRoute as jest.Mock;

  const mockSetOptions = jest.fn();
  const mockCanGoBack = jest.fn();
  const mockGetPokemon = getPokemonDetails as jest.Mock;

  const pokemons: Pokedex = {
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
    location_area_encounters:
      'https://pokeapi.co/api/v2/pokemon/899/encounters',
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

  beforeEach(() => {
    mockUseRoute.mockReturnValue({
      params: {
        pokemon: pokemonRouteParams,
      },
    });
    mockUseNavigation.mockReturnValue({
      setOptions: mockSetOptions,
      canGoBack: mockCanGoBack
    });

    mockGetPokemon.mockResolvedValue(pokemons);
  });

  it('renders activity indicator (spinner) initially and then removes it', async () => {
    const {queryByTestId} = render(<PokemonDetailScreen />);

    expect(queryByTestId('activity-indicator')).toBeTruthy();
    await waitFor(() =>
      expect(queryByTestId('activity-indicator')).toBeFalsy(),
    );
  });
  it('renders error message when fails to get pokemon details', async () => {
    const errorMessage = 'Failed to get pokemon details';

    mockGetPokemon.mockRejectedValue(new Error(errorMessage));

    const {getByText} = render(<PokemonDetailScreen />);

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeTruthy();
    });
  });
  it('renders pokemons data', async () => {
    const {getByText} = render(<PokemonDetailScreen />);

    await waitFor(() => {
      expect(getByText('intimidate')).toBeTruthy(); //abilities
      expect(getByText('1.8 (M)')).toBeTruthy(); //height
      expect(getByText('wyrdeer')).toBeTruthy(); //abilities
      expect(getByText('95.1 (Kg)')).toBeTruthy(); //weight
    });
  });
});
