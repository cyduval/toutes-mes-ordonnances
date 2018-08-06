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

const RootStack = createStackNavigator(
    {
        Drawer: Drawer,

        Choose: Choose,
        Snap: Snap,
        New: New,
        List: List,
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