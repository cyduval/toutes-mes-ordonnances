/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { Overlay } from 'react-native-elements';

export default class NoNetwork extends React.Component  {
  render() {
    return (
      <Overlay isVisible>
        <Text>This app need internet connection</Text>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    borderRadius: 50,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    borderColor: '#FFFFFF',   // White colored border
    paddingHorizontal: 50,    // Horizontal padding
    paddingVertical: 10,      // Vertical padding
  },
  // Button text
  text: {
    // color: '#FFFFFF',
    fontWeight: 'bold',
    // fontFamily: 'Avenir',
  },
});