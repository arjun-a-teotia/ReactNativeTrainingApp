/**
 * @format
 */

import 'react-native';
import React from 'react';
import {SplashScreen} from './index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {waitFor} from '@testing-library/react-native';
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
  return jest.fn().mockReturnValue({currentUser: jest.fn()});
});
jest.mock('@react-native-firebase/analytics', () => {
  return jest.fn().mockReturnValue({logEvent: jest.fn()});
});
jest.mock('react-native-qrcode-svg', () => ({}));
jest.useFakeTimers();
describe('Splash Screen Testing', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SplashScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('wait for analytics calling', async () => {
    await waitFor(async () => {
      expect(analytics().logEvent).toBeCalledTimes(1);
    });
  });
  it('navigates to profile screen after 1 sec', async () => {
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
