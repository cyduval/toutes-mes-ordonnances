import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import Drawer from 'app/screens/Navigation/Drawer';
import Drawer1 from 'app/screens/Navigation/Drawer1';


import List from 'app/screens/Prescriptions/List';
import New from 'app/screens/Prescriptions/New';
import Choose from 'app/screens/Prescriptions/Choose';
import Snap from 'app/screens/Prescriptions/Snap';
import Detail from 'app/screens/Prescriptions/Detail';

import Login from 'app/screens/Auth/Login';
import Reset from 'app/screens/Auth/Reset';
import Register from 'app/screens/Auth/Register';
import Profile from 'app/screens/Auth/Profile';

import ListAlert from 'app/screens/Pill/ListAlert';
import NewAlert from 'app/screens/Pill/NewAlert';

const RootStack = createStackNavigator(
    {
        Drawer: Drawer,

        Choose: Choose,
        Snap: Snap,
        New: New,
        List: List,

        Login: Login,
        Reset: Reset,
        Register: Register,
        Profile: Profile,

        ListAlert: ListAlert,
        NewAlert: NewAlert,
    },
    {
      initialRouteName: 'Drawer',
      headerMode: 'none',
    }
  );

  const RootStack1 = createStackNavigator(
    {
        Drawer: Drawer1,

        Choose: Choose,
        Snap: Snap,
        New: New,
        List: List,
        Detail: Detail,

        Login: Login,
        Reset: Reset,
        Register: Register,
        Profile: Profile,

        ListAlert: ListAlert,
        NewAlert: NewAlert,

    },
    {
      initialRouteName: 'Drawer',
      headerMode: 'none',
    }
  );

class Stack extends React.Component {
    
    render() {
        const { auth } = this.props;
        if (auth.loginStatus === 'logged') {
            return ( <RootStack1 /> );
          }
          return ( <RootStack /> );
    }
}

const mapStateToProps = state => {
    return { ...state
    };
  };
  
  const withConnect = connect(
    mapStateToProps,
    false,
  );
  
  export default compose(
    withConnect,
  )(Stack);