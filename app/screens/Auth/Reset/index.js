import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Reset extends React.Component {
    static navigationOptions = {
        title: 'Reset',
    };
  
    render() {
      return (
        <View style={styles.container}>
            <View>
                <Text>
                    Reset
                </Text>
            </View>

        </View>
      );
    }
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
    },

});

export default Reset;