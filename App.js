import React from 'react';
import "babel-polyfill";
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from 'app/screens/App';

import firebase from 'firebase';
import { firebaseConfig } from 'toutesmesordonnances/config/auth';
import { loginSuccess  } from 'app/screens/Auth/actions';

const initialState = {};
const store  = configureStore(initialState);

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(' SIGNED !');
    console.log(user);
    store.dispatch(loginSuccess({user}));
  } else {
    console.log(' NOT SIGNED !');
  }
});

export default class RootComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };

  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


