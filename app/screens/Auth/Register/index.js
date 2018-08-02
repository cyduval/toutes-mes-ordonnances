import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Register extends React.Component {
    static navigationOptions = {
        title: 'Register',
    };
  
    render() {
      return (
        <View style={styles.container}>
            <View>
                <Text>
                    register
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

export default Register;