/**
 * @format
 */

import 'react-native';
import React from 'react';
import {RegisterScreen} from './index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import analytics from '@react-native-firebase/analytics';
import {Alert} from 'react-native';
const mockNavigate = jest.fn();

jest.spyOn(Alert, 'alert');
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
  return jest.fn().mockReturnValue({
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({data: {}})),
  });
});
jest.mock('@react-native-firebase/analytics', () => {
  return jest.fn().mockReturnValue({logEvent: jest.fn()});
});
jest.useFakeTimers();

describe('Login Screen Testing', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RegisterScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('navigates to login screen clicking login button', async () => {
    const {getByTestId} = render(<RegisterScreen />);
    fireEvent.press(getByTestId('Login'));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
  it('register button click', async () => {
    const {getByTestId} = render(<RegisterScreen />);
    // const mock = jest.fn();
    // fireEvent.changeText(getByTestId('email'), 'test');
    // expect(mock).toHaveBeenCalledWith('test');
    // fireEvent.changeText(getByTestId('password'), 'test');
    // expect(mock).toHaveBeenCalledWith('test');
    fireEvent.press(getByTestId('Sign Up'));
    await waitFor(async () => {
      expect(analytics().logEvent).toBeCalledTimes(1);
    });
  });
});
