import { all } from 'redux-saga/effects';
import authSaga from './authSaga.js';
import testsSaga from './testsSaga';

export default function* rootSaga() {
  yield all([authSaga(), testsSaga()]);
}
