import React from 'react';
import firebase from 'firebase';
import Sentry from 'sentry-expo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NetInfo, Image, AsyncStorage } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Home from '../Home';
import Auth from '../Auth';
import NoNetwork from '../NoNetwork';
import { loginSuccess } from '../Auth/Login/actions';
import Loading from '../../components/Loading';

class AppScreen extends React.Component {

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

    componentDidMount() {
      const user = firebase.auth().currentUser;
      // alert(user);
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
      const { auth, global } = this.props;

      console.log(112233);
      console.log(auth);

      if (global.isNetwork === 'none' || global.isNetwork === 'unknown' || global.isNetwork === 'undefined') {
        return (<NoNetwork />);
      }

      if(!auth.user) {
        return (<Auth />);
      }
  
      if(!auth.firebaseLoaded) {
        return (<Loading />);
      }
      
      return (<Home />);
  
      // if (this.state.finish || this.state.onboarding) {
        return (<Home />);
      // }
  
      return (
      <Onboarding
        onDone={this.onFinish}
        onSkip={this.onFinish}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/1.png')} />,
            title: 'Onboarding 1',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/2.png')} />,
            title: 'Onboarding 2',
            subtitle: 'eeeeeee',
          },
        ]}
      />
      );
  
    }
  }
  

const mapStateToProps = state => {
  return { ...state };
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