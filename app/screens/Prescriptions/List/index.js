import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

class List extends React.Component {

    render() {
      return (
        <View style={styles.container}>

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 25 }}>

            <Text>
              List
            </Text>



            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f3f3f3',
  },
});


export default List