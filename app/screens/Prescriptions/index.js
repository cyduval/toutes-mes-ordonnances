import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

import List from './List';
import New from './New';
import Choose from './Choose';
import Snap from './Snap';

class Prescriptions extends React.Component {

    render() {
      return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 25 }}>

            <View style={{ margin: 30 }}>
              <Button
                title='mes ordonances' 
                buttonStyle={styles.button}
                onPress={() => this.props.navigation.navigate('List')}
              />
            </View>

            <View style={{ margin: 30 }}>
              <Button
                title='nouvelle ordonance' 
                buttonStyle={styles.button}
                onPress={() => this.props.navigation.navigate('New')}
              />
            </View>

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
  button: {
    marginTop: 15,
    marginBottom: 15, 
    marginLeft: 5, 
    marginRight: 5, 
    backgroundColor: colors.main,
  },
});


export default createStackNavigator({
  Prescriptions: {
    screen: Prescriptions,
    navigationOptions: ({ navigation }) => ({
      title: 'Ordonnances',
    }),
  },
  New: {
    screen: New,
    navigationOptions: ({ navigation }) => ({
      title: 'Nouvelle ordonnance',
    }),
  },  
  List: {
    screen: List,
    navigationOptions: ({ navigation }) => ({
      title: 'Liste de mes ordonnances',
    }),
  }, 
  Choose: {
    screen: Choose,
    navigationOptions: ({ navigation }) => ({
      title: 'Choisir sa pharmacie',
    }),
  }, 
  Snap: {
    screen: Snap,
    navigationOptions: ({ navigation }) => ({
      title: 'Prendre une photo',
    }),
  }, 
}, {
  initialRouteName: 'Prescriptions',
});

