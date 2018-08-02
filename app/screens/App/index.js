import React from 'react';
import Sentry from 'sentry-expo';
import {
  compose
} from 'redux';
import {
  connect
} from 'react-redux';
import {
  AsyncStorage
} from 'react-native';
import Onboarding from 'app/components/OnBoarding';
// import Stack from 'app/screens/Navigation/Stack';
import Drawer from 'app/screens/Navigation/Drawer';
import Drawer1 from 'app/screens/Navigation/Drawer1';

class AppScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onboarding: false,
    };
    // Remove this once Sentry is correctly setup.
    // Sentry.enableInExpoDevelopment = true;
    Sentry.config('https://1453d539784e4f92982c22a166afa5a7@sentry.io/1246851').install();
  }

  componentWillMount() {
    this.handleOnboarding();
  }

  handleOnboarding = async () => {
    const value = await AsyncStorage.getItem('onboarding');
    if (value) {
      this.setState({
        onboarding: value
      });
    }
  }

  onboardingFinish = async () => {
    AsyncStorage.setItem('onboarding', true);
    this.setState({
      onboarding: true
    });
  }

  render() {
    const {
      auth,
      app
    } = this.props;

    if (!app || !auth) {
      return false;
    }

    if (!this.state.onboarding) {
      return ( <Onboarding onboardingFinish = {this.onboardingFinish}/> );
    }
    
    if (this.props.auth.loginStatus === 'logged') {
      return ( <Drawer1 /> );
    }
    return ( <Drawer /> );
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
)(AppScreen);