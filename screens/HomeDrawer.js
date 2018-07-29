import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { Button as ButtonElement, Header } from 'react-native-elements';
import { colors } from '../constants';
import MyPharmaciesScreen from './MyPharmacies';
import MyPrescriptionsScreen from './MyPrescriptions';
import MyPillScreen from './MyPill';

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });

class MyHomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/icons/chats-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
      return (
        <View style={{ flex: 1,  flexDirection: 'column'}}>
            <Header
                leftComponent={{ icon: 'home', color: '#fff' }}
                centerComponent={{ text: 'Home', style: { color: '#fff' } }}
                rightComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{  }}
                innerContainerStyles={{  }}
                backgroundColor={colors.main}
            />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 }}>

                <ButtonElement
                    raised
                    backgroundColor={colors.main}
                    title='Mes pharmacies'
                    containerViewStyle={{ width: '35%', height: '100%' }}
                    buttonStyle={{  height: '100%' }}
                    fontSize={16}
                    textStyle={{ textAlign: 'center' }}
                    onPress={() => this.props.navigation.navigate('MyPharmacies')}
                />

                <ButtonElement
                    raised
                    backgroundColor={colors.main}
                    title='Envoyer mon ordonnance'
                    containerViewStyle ={{ width: '35%', height: '100%' }}
                    buttonStyle={{  height: '100%' }}
                    fontSize={16}
                    textStyle={{ textAlign: 'center' }}
                    onPress={() => this.props.navigation.navigate('MyPrescriptions')}
                />

            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <ButtonElement
                    raised
                    backgroundColor={colors.main}
                    icon={{name: 'pill', type: 'material-community', size: 24}}
                    title='Mon pilulier'
                    containerViewStyle ={{ width: '80%' }}
                    fontSize={24}
                    onPress={() => this.props.navigation.navigate('MyPill')}
                />
            </View>
        </View>
      );
    }
  }
  

  
  export default createDrawerNavigator({
    Home: {
      screen: MyHomeScreen,
    },
    MyPharmacies: {
        screen: MyPharmaciesScreen,
    },
    MyPrescriptions: {
        screen: MyPrescriptionsScreen,
    },
    MyPill: {
        screen: MyPillScreen,
    },
  }, {
    drawerPosition: 'right',
  });