import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Loading extends React.Component  {
  render() {
    return (
        <View style={styles.button}>
            <Text style={styles.text}>Loading...</Text>
        </View>
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
    color: '#FFFFFF',
    fontWeight: 'bold',
    // fontFamily: 'Avenir',
  },
});