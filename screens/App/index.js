import React from 'react';
import firebase from 'firebase';
import Sentry from 'sentry-expo';
import {
  compose
} from 'redux';
import {
  connect
} from 'react-redux';
import {
  NetInfo,
  Image,
  AsyncStorage
} from 'react-native';
import Onboarding from '../OnBoarding';
import Home from '../Home';
import Auth from '../Auth';
import NoNetwork from '../NoNetwork';
import {
  loginSuccess
} from '../Auth/Login/actions';
import Loading from '../../components/Loading';

class AppScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      onboarding: 'no',
    };
    // Remove this once Sentry is correctly setup.
    Sentry.enableInExpoDevelopment = true;
    Sentry.config('https://1453d539784e4f92982c22a166afa5a7@sentry.io/1246851').install();
  }

  componentWillMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });
    this._getData();
  }

  _getData = async () => {
    const value = await AsyncStorage.getItem('onboarding');
    this.setState({
      onboarding: value
    });
  }

  onboardingFinish = () => {
    console.log(9999);
    this.setState({
      onboarding: 'yes'
    });  
  }

  render() {
    const {
      auth,
      global
    } = this.props;

    if (global.isNetwork === 'none' || global.isNetwork === 'unknown' || global.isNetwork === 'undefined') {
      return ( < NoNetwork / > );
    }

    if (!auth.user) {
      return ( < Auth / > );
    }

    if (!auth.firebaseLoaded) {
      return ( < Loading / > );
    }

    console.log('onboarding => ', this.state.onboarding);
    if (this.state.onboarding !== 'yes') {
      return ( < Onboarding onboardingFinish={this.onboardingFinish} / > );
    }

    return ( < Home / > );

  }
}

const mapStateToProps = state => {
  return { ...state
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onLoginUserSuccess: data => dispatch(loginSuccess(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(AppScreen);