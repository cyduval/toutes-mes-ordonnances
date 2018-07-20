import React from 'react';
import { Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Formu from './Form';
import LocationScreen from './Location';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Home 1"
          onPress={() => this.props.navigation.navigate('Home1')}
        />
        <Button
          title="Go to Location"
          onPress={() => this.props.navigation.navigate('Location')}
        />
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