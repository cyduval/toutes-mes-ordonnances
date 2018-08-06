import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';
import { Constants } from 'expo';

export default class Prescriptions extends React.Component {

    render() {
      return (
        <View style={styles.root}>
          <Header
              leftComponent={{ size: 30, icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
              centerComponent={{ text: 'Ordonnances', style: { color: '#fff' } }}
              statusBarProps={{ barStyle: 'light-content' }}
              outerContainerStyles={{ width: '100%'  }}
              innerContainerStyles={{  }}
              backgroundColor={colors.main}
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
