import React from 'react';
import {
    createDrawerNavigator
} from 'react-navigation';
import Home from 'app/screens/Home';
import Pharmacies from 'app/screens/Pharmacies';
import Prescriptions from 'app/screens/Prescriptions';
import Pill from 'app/screens/Pill';
import Timeout from 'app/screens/Timeout';
import Login from 'app/screens/Auth/Login';
import Onboarding from 'app/components/OnBoarding';
import { Icon } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

import Barcode from 'app/screens/Barcode';

export default createDrawerNavigator({
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'M\'identifier',
            drawerIcon: ({ tintColor }) => (
              <Icon
                  name='user'
                  type='font-awesome'
                  size={24}
                  color={colors.main}
              />
            ),
          }),
    },
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'Home',
            drawerIcon: () => (
              <Icon
                  name='home'
                  type='font-awesome'
                  size={24}
                  color={colors.main}
              />
            ),
          }),
    },
    Pharmacies: {
        screen: Pharmacies,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'Mes pharmacies',
            drawerIcon: () => (
              <Icon
                  name='ticket'
                  type='font-awesome'
                  size={24}
                  color={colors.main}
              />
            ),
          }),
    },
    Prescriptions: {
        screen: Prescriptions,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'Mes ordonnances',
            drawerIcon: () => (
              <Icon
                  name='file-o'
                  type='font-awesome'
                  size={24}
                  color={colors.main}
              />
            ),
          }),
    },
    Pill: {
        screen: Pill,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'Mon pilulier',
            drawerIcon: () => (
                <Icon
                    name='pill'
                    type='material-community'
                    size={24}
                    color={colors.main}
                />
            ),
          }),
    },
    Timeout: {
        screen: Timeout,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: ' '
        }),
    },
    Onboarding: {
        screen: Onboarding,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'Onboarding'
        }),
    },
    Barcode: {
        screen: Barcode,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'Barcode'
        }),
    },
    

}, {
    // drawerPosition: 'right',
    // initialRouteName: 'Home',
    initialRouteName: 'Timeout',
});