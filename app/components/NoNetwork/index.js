/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React from 'react';
import {
  Text,
} from 'react-native';
import { Overlay } from 'react-native-elements';

export default class NoNetwork extends React.Component  {
  render() {
    return (
      <Overlay isVisible>
        <Text h5>Pas de connection internet</Text>
        <Text h6>Impossible de e connecter au réseau. Merci de bien vouloir réessayer.</Text>
      </Overlay>
    );
  }
}