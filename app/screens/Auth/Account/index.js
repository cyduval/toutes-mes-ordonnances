import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from 'app/screens/Auth/Login';
import Register from 'app/screens/Auth/Register';
import Reset from 'app/screens/Auth/Reset';
import Profile from 'app/screens/Auth/Profile';

const AccountNavigator = createStackNavigator({
    
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Reset: {
        screen: Reset
    },
    Profile: {
        screen: Profile
    },
    
});



export default createStackNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Reset: {
        screen: Reset
    },
    Profile: {
        screen: Profile
    },
}, {
    initialRouteName: 'Login',
});

/*
export default class Account extends React.Component {
    static navigationOptions = {
        drawerLabel: 'M\'identifier',
        drawerIcon: ({ tintColor }) => (
          <Icon
              name='menu'
              size={24}
              color={colors.main}
          />
        ),
    };
    render() {
      return (
        <AccountNavigator />
      );
    }
  }
*/