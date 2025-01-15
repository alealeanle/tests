import { call, put } from 'redux-saga/effects';
import api from '@api';
import {
  deleteTestSuccess,
  deleteQuestionSuccess,
  deleteAnswerSuccess,
} from '@models/testsSlice';

export function* deleteCurrentTestSaga(testId) {
  try {
    yield call(api.delete, `/tests/${testId}`);
    yield put(deleteTestSuccess({ id: testId }));
  } catch (error) {
    console.error(`Ошибка удаления теста: ${error.message}`);
    throw error;
  }
}

export function* deleteQuestionSaga(question) {
  try {
    yield call(api.delete, `/questions/${question.id}`);
    yield put(deleteQuestionSuccess({ id: question.id }));
  } catch (error) {
    console.error(`Ошибка удаления вопроса: ${error.message}`);
    throw error;
  }
}

export function* deleteAnswerSaga(answer) {
  try {
    yield call(api.delete, `/answers/${answer.id}`);
    yield put(deleteAnswerSuccess({ id: answer.id }));
  } catch (error) {
    console.error(`Ошибка удаления ответа: ${error.message}`);
    throw error;
  }
}
