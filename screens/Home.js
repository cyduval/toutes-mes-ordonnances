import React from 'react';
import { Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Button as ButtonElement } from 'react-native-elements';
import Formu from './Form';
import LocationScreen from './Location';
import { colors } from '../constants';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 }}>

          <ButtonElement
            raised
            backgroundColor={colors.main}
            title='Mes pharmacies'
            containerViewStyle={{ width: '35%', height: '100%' }}
            buttonStyle={{  height: '100%' }}
            fontSize={16}
            textStyle={{ textAlign: 'center' }}
            onPress={() => this.props.navigation.navigate('Home1')}
          />

          <ButtonElement
            raised
            backgroundColor={colors.main}
            title='Envoyer mon ordonnance'
            containerViewStyle ={{ width: '35%', height: '100%' }}
            buttonStyle={{  height: '100%' }}
            fontSize={16}
            textStyle={{ textAlign: 'center' }}
            onPress={() => this.props.navigation.navigate('Home1')}
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
            onPress={() => this.props.navigation.navigate('Home1')}
          />
        </View>


        <View style={{ display: 'none' }}>
          <Button
            title="Go to Home 1"
            onPress={() => this.props.navigation.navigate('Home1')}
          />
          <Button
            title="Go to Location"
            onPress={() => this.props.navigation.navigate('Location')}
          />
        </View>
      </View>
    );
  }
}

class Home1Screen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home1111!</Text>
          <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        </View>
      );
    }
  }

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Home1: Formu,
    Location: LocationScreen,
  });

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

class Page1Screen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>page 1</Text>
        </View>
      );
    }
}

export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsScreen },
    Page1: { screen: Page1Screen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'Page1') {
            iconName = `md-checkmark-circle${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);