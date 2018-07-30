import React from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { NetInfo } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore';
import { onStatusChange  } from './screens/App/actions';
import { loginSuccess  } from './screens/Auth/Login/actions';

import ConnectedAppScreen from './screens/App';
import { firebaseConfig } from './config/auth';

// import '../lib/global.js';

// import createReducer from './reducers';
// const store = createStore(createReducer(), {});
const initialState = {};
// const { store, persistor } = configureStore(initialState);
const store  = configureStore(initialState);

NetInfo.getConnectionInfo().then((connectionInfo) => {
  store.dispatch(onStatusChange(connectionInfo.type));
});
function handleFirstConnectivityChange(connectionInfo) {
  store.dispatch(onStatusChange(connectionInfo.type));
}
NetInfo.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);

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
          <ConnectedAppScreen />
      </Provider>
    );
    /*
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedAppScreen />
        </PersistGate>
      </Provider>
    );
    */
  }
}


