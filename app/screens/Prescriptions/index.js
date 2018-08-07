import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';
import { Constants } from 'expo';
import Header from 'app/components/Header';

export default class Prescriptions extends React.Component {

    render() {
      return (
        <View style={styles.root}>
          <Header
            icon="menu"
            onPress={() => this.props.navigation.openDrawer()}
            text="mes ordonnances"
          />

          <View style={styles.container}>

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
  button: {
    margin: 15,
    backgroundColor: colors.main,
    padding: 10,
    width: '100%',
  },
});
