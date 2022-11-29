/**
 * @format
 */

import 'react-native';
import React from 'react';
import {ProfileScreen} from './index';

// Note: test renderer must be required after react-native.
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import analytics from '@react-native-firebase/analytics';
import {getPokemon} from '../..//api';
import {Pokemon} from '../../models';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');

  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
      dispatch: mockNavigate,
    }),
  };
});

jest.mock('@react-native-firebase/app', () => {
  return () => ({
    app: jest.fn(),
  });
});
jest.mock('@react-native-firebase/auth', () => {
  return jest.fn().mockReturnValue({signOut: jest.fn()});
});
jest.mock('@react-native-firebase/analytics', () => {
  return jest.fn().mockReturnValue({logEvent: jest.fn()});
});
jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('src/api');

describe('Profile Screen Testing', () => {
  const mockGetPokemon = getPokemon as jest.Mock;

  const pokemons: readonly Pokemon[] = [
    {
      name: 'Leeds',
      url: 'www.google.com',
    },
  ];

  beforeEach(() => {
    // console.debug("mockGetPokemon", await mockGetPokemon());
    mockGetPokemon.mockResolvedValue(pokemons);
  });

  it('renders activity indicator (spinner) initially and then removes it', async () => {
    const {queryByTestId} = render(<ProfileScreen />);

    expect(queryByTestId('activity-indicator')).toBeTruthy();
    await waitFor(() =>
      expect(queryByTestId('activity-indicator')).toBeFalsy(),
    );
  });
  it('renders error message when fails to get pokemon list', async () => {
    const errorMessage = 'Failed to get pokemon list';

    mockGetPokemon.mockRejectedValue(new Error(errorMessage));

    const {getByText} = render(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeTruthy();
    });
  });
  it.each(pokemons)('renders pokemons list', async ({name}) => {
    const {getByTestId} = render(<ProfileScreen />);

    await waitFor(() => {
      expect(getByTestId(name)).toBeTruthy();
    });
  });
  it.each(pokemons)(
    'navigates to detail screen when user selects Pokemon "%j"',
    async pokemon => {
      const {getByTestId} = render(<ProfileScreen />);

      const {name} = pokemon;

      await waitFor(() => {
        expect(getByTestId(name)).toBeTruthy();
      });

      fireEvent.press(getByTestId(name));

      expect(mockNavigate).toHaveBeenCalledWith('PokemonDetailScreen', {
        pokemon,
      });
    },
  );

  it('navigates to login screen clicking logout button', async () => {
    const {getByTestId} = render(<ProfileScreen />);
    fireEvent.press(getByTestId('logout'));
    await waitFor(async () => {
      expect(analytics().logEvent).toBeCalledTimes(1);
    });
  });
});
