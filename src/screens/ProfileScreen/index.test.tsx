/**
 * @format
 */

import 'react-native';
import React from 'react';
import {ProfileScreen} from './index';

// Note: test renderer must be required after react-native.
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import analytics from '@react-native-firebase/analytics';
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
jest.mock('react-native-qrcode-svg', () => ({}));
jest.useFakeTimers();
describe('Profile Screen Testing', () => {
  it('renders correctly', () => {
    const tree = render(<ProfileScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('navigates to login screen clicking logout button', async () => {
    const {getByTestId} = render(<ProfileScreen />);
    fireEvent.press(getByTestId('logout'));
    await waitFor(async () => {
      expect(analytics().logEvent).toBeCalledTimes(1);
    });
  });
});
