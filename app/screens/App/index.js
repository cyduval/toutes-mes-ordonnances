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
import Stack from 'app/screens/Navigation/Stack';

class AppScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'initial',
    };
    // Remove this once Sentry is correctly setup.
    // Sentry.enableInExpoDevelopment = true;
    Sentry.config('https://1453d539784e4f92982c22a166afa5a7@sentry.io/1246851').install();

  }

  componentWillMount() {
    this.handleOnboarding();
  }

  handleOnboarding = async () => {
    const value = await AsyncStorage.getItem('onboarding1');
    if (value) {
      this.setState({
        status: value
      });
    } else {
      this.setState({
        status: 'notOnBoarded'
      });   
    }
  }

  onboardingFinish = async () => {
    AsyncStorage.setItem('onboarding1', 'onBoarded');
    this.setState({
      status: 'onBoarded'
    });
  }

  render() {
    const {
      auth,
      app
    } = this.props;

    if (!app || !auth || this.state.status === 'initial') {
      return false;
    }

    if (this.state.status === 'notOnBoarded') {
      return ( <Onboarding onboardingFinish={this.onboardingFinish} /> );
    }
    
    return ( <Stack /> );
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