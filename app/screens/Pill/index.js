import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Constants } from 'expo';
import Header from 'app/components/Header';

class Pill extends React.Component {
  
    render() {
      return (
        <View style={styles.root}>
          <Header
            icon="menu"
            onPress={() => this.props.navigation.openDrawer()}
            text="Mon pilulier"
          />

            <View style={styles.container}>
                <Text>
                    Mon pilulier
                </Text>
            </View>

        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: Constants.statusBarHeight,
    },
    container: {
      flex: 1,
      backgroundColor: '#f3f3f3',
      // justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%',
      width: '100%',
    },
  });

export default Pill;