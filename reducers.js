import { combineReducers } from 'redux';
import appReducer from './app/screens/App/reducer';
import authReducer from './app/screens/Auth/reducer';
import prescriptionReducer from './app/screens/Prescriptions/reducer';

export default function createReducer(injectedReducers) {
    return combineReducers({
      app: appReducer,
      auth: authReducer,
      prescription: prescriptionReducer,
      ...injectedReducers,
    });
  }
