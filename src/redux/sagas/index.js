import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga.js';

export default function* rootSaga() {
  yield all([authSaga()]);
}
