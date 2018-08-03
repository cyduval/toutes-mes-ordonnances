
import { call, takeLatest } from 'redux-saga/effects';
import * as api from 'toutesmesordonnances/utils/api';
import { SEND_PRESCRIPTION } from './constants';


function* sendPrescription(data) {
  console.log('sendPrescription');
  console.log(data);

  const { payload } = data;

  
  let response;
  try {
    response = yield call(api.requestApi, { method: 'post', url: 'https://www.toutemapharmacie.com/public/scan/new2.php', data: payload });
    console.log(678);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

}


export default function* watcherSagas() {
  yield takeLatest(SEND_PRESCRIPTION, sendPrescription);
}
