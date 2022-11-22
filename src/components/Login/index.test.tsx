/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Login} from './index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');

  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Login component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Login
          mainBtnTitle="Login"
          navBtnTitle="Register"
          onAction={() => null}
          onNavigation={() => null}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
