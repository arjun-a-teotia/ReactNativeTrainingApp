import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import {Login} from '../../../src/components';

Login.arguments = {
    mainBtnTitle: String,
    navBtnTitle: String,
    onAction: () => null,
    onAction: () => null,
}

storiesOf('Login', module)
  .add('Blank Screen', () => (
    <Login
      mainBtnTitle="Login"
      navBtnTitle="Register"
      onAction={action('onAction')}
      onNavigation={action('onNavigation')}
    />
  ))
