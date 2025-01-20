import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from '@models/authSlice';
import api from '@api';

function* fetchCurrentUserSaga() {
  try {
    const response = yield call(api.get, '/users/current');
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    yield put(
      fetchUserFailure(
        `Ошибка: ${error.response?.data?.error}` ||
          'Ошибка загрузки пользователя',
      ),
    );
  }
}

function* loginSaga(action) {
  try {
    const response = yield call(api.post, '/signin', action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(
      loginFailure(
        `Ошибка: ${error.response?.data?.error}` || 'Ошибка авторизации',
      ),
    );
  }
}

function* logoutSaga() {
  try {
    yield call(api.delete, '/logout');
    yield put(logoutSuccess());
  } catch (error) {
    yield put(
      logoutFailure(error.response?.data?.error || 'Ошибка авторизации'),
    );
  }
}

function* registerSaga(action) {
  try {
    yield call(api.post, '/signup', action.payload);
    yield put(registerSuccess());
  } catch (error) {
    yield put(
      registerFailure(
        `Ошибка: ${JSON.stringify(error.response?.data)}` ||
          'Ошибка регистрации',
      ),
    );
  }
}

export default function* authSaga() {
  yield takeLatest(fetchUserRequest.type, fetchCurrentUserSaga);
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
  yield takeLatest(registerRequest.type, registerSaga);
}
