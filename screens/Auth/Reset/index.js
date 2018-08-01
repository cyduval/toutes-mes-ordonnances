import React from 'react';
import firebase from 'firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Input, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';

import { resetFailure } from '../Login/actions';
import ErrorMessage from '../Login/ErrorMessage';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ResetScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isEmailValid: true,
      isLoading: false,
    };

    this.reset = this.reset.bind(this);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  reset() {
    const {
      email,
    } = this.state;
    this.setState({ isLoading: true, isEmailValid: true  });

    if(!this.validateEmail(email)) {
      this.setState({ isLoading: false, isEmailValid: false });
    }

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      this.setState({
        isLoading: false,
      });
      Alert.alert(
        'Mot de passe perdu',
        'Un mail vous a été envoyé',
        [
          {text: 'Ok', onPress: () => this.props.navigation.goBack()},
        ],
        { cancelable: false }
      )
    
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        isLoading: false,
      });
      this.props.onResetFailure(error.message);
    });
  }

  render() {
    const {
      isLoading,
      isEmailValid,
      email,
    } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior='position'>
            <View style={styles.formContainer}>
              <Input
                leftIcon={
                  <Icon
                    name='envelope-o'
                    color='rgba(0, 0, 0, 0.38)'
                    size={25}
                    style={{backgroundColor: 'transparent'}}
                  />
                }
                value={email}
                keyboardAppearance='light'
                autoFocus={false}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='next'
                inputStyle={{marginLeft: 10}}
                placeholder={'Email'}
                containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                ref={input => this.emailInput = input}
                onSubmitEditing={() => this.passwordInput.focus()}
                onChangeText={email => this.setState({ email })}
                errorMessage={isEmailValid ? null : 'Please enter a valid email address'}
              />
                <Button
                  buttonStyle={styles.loginButton}
                  containerStyle={{marginTop: 32, flex: 0}}
                  activeOpacity={0.8}
                  title="RESET PASSWORD"
                  onPress={this.reset}
                  titleStyle={styles.loginTextButton}
                  loading={isLoading}
                  disabled={isLoading}
                />
            </View>
          </KeyboardAvoidingView>
        </View>
        <ErrorMessage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems:'center',
  },
});


const mapStateToProps = state => {
  return { ...state };
};

function mapDispatchToProps(dispatch) {
  return {
    onResetFailure: msg => dispatch(resetFailure(msg)),
  };
}

// const withSaga = injectSaga({ key: 'auth', saga });

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

export default compose(
    // withSaga,
    withConnect,
  )(ResetScreen);

