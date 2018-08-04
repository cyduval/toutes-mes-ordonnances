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
import Onboarding2 from 'app/components/OnBoarding2';
// import Stack from 'app/screens/Navigation/Stack';
import Drawer from 'app/screens/Navigation/Drawer';
import Drawer1 from 'app/screens/Navigation/Drawer1';

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

    console.log(999);
    console.log(this.state);

    if (!app || !auth || this.state.status === 'initial') {
      return false;
    }

    console.log('AA');
    console.log(app);
    console.log(auth);

    if (this.state.status === 'notOnBoarded') {
      console.log(2222222);
      return ( <Onboarding2 onboardingFinish={this.onboardingFinish} /> );
    }

    console.log(111111);
    
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