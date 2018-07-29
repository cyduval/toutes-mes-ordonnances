import { combineReducers } from 'redux';
import globalReducer from './App/reducer';

export default function createReducer(injectedReducers) {
    return combineReducers({
      global: globalReducer,
      ...injectedReducers,
    });
  }
