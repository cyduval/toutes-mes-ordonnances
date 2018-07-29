import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NetInfo } from 'react-native';
import { onStatusChange  } from './screens/App/actions';
import ConnectedAppScreen from './screens/App';
import createReducer from './screens/reducers';

const store = createStore(createReducer(), {});

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


export default class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedAppScreen />
      </Provider>
    );
  }
}

