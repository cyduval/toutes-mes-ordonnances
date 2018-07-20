import React from 'react';
// import { Root } from './config/router';
import Sentry from 'sentry-expo';
import Welcome  from './screens/Welcome';
import { NetInfo, Image, AsyncStorage } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Home from './screens/Home';




export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);

    this.state = {
      finish: false,
      onboarding: false,
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

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('onboarding', true);
    } catch (error) {
      console.log(error);
    }
  }

  _getData = async () => {
    const value = await AsyncStorage.getItem('onboarding');
    this.setState({ onboarding: value });
  }

  onFinish() {
    this._storeData();
    this.setState({ finish: true, onboarding: true });
  }

  render() {
    // return (<Root />);
    // return (<Welcome />);
    console.log(111);
    console.log(this.state);


    if (this.state.finish || this.state.onboarding) {
      return (<Home />);
    }

    return (
    <Onboarding
      onDone={this.onFinish}
      onSkip={this.onFinish}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('./assets/1.png')} />,
          title: 'Onboarding 1',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('./assets/2.png')} />,
          title: 'Onboarding 2',
          subtitle: 'eeeeeee',
        },
      ]}
    />
    );

  }
}

