import { fromJS } from 'immutable';

import {
  STATUS_CHANGE,
} from './constants';

const initialState = fromJS({
  loading: false,
  isNetwork: 'none',
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STATUS_CHANGE: {
      return state.set('isNetwork', action.payload);
    }
    default:
      return state;
  }
}

export default appReducer;
