import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Constants } from 'expo';
import Header from 'app/components/Header';

class ListAlert extends React.Component {

    render() {

      return (
        <View style={styles.root}>
          <Header
            onPress={() => this.props.navigation.goBack()}
            text="liste alertes"
          />

            <View style={styles.container}>
                <Text>
                    liste alertes
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
      alignItems: 'center', 
      height: '100%',
      width: '100%',
    },
  });

export default ListAlert;