import { combineReducers } from 'redux';
import globalReducer from './screens/App/reducer';
import authReducer from './screens/Auth/Login/reducer';

export default function createReducer(injectedReducers) {
    return combineReducers({
      global: globalReducer,
      auth: authReducer,
      ...injectedReducers,
    });
  }
