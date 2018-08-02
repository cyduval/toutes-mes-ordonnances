import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from 'app/screens/Home';
import Pharmacies from 'app/screens/Pharmacies';
import Drawer from 'app/screens/Navigation/Drawer';

const RootStack = createStackNavigator(
    {
        Drawer: Drawer,
    },
    {
      initialRouteName: 'Drawer',
    }
  );

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}