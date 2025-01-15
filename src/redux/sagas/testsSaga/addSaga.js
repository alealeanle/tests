import { call, put } from 'redux-saga/effects';
import api from '@api';
import {
  addTestSuccess,
  addQuestionSuccess,
  addAnswerSuccess,
} from '@models/testsSlice';

export function* addNewTestSaga(action) {
  try {
    const testResponse = yield call(api.post, '/tests', {
      title: action.payload.newTestTitle,
    });
    const testId = testResponse.data.id;
    yield put(addTestSuccess(testResponse.data));
    return testId;
  } catch (error) {
    console.error(`Ошибка добавления теста: ${error.message}`);
    throw error;
  }
}

export function* addQuestionSaga(testId, question) {
  try {
    const { answers, ...questionData } = question;
    const questionResponse = yield call(
      api.post,
      `/tests/${testId}/questions`,
      questionData,
    );
    const questionId = questionResponse.data.id;
    yield put(addQuestionSuccess({ ...questionResponse.data, testId }));

    if (question.question_type !== 'number') {
      for (const answer of answers) {
        yield call(addAnswerSaga, questionId, answer);
      }
    }
  } catch (error) {
    console.error(`Ошибка добавления вопроса: ${error.message}`);
    throw error;
  }
}

export function* addAnswerSaga(questionId, answer) {
  try {
    const answerResponse = yield call(
      api.post,
      `/questions/${questionId}/answers`,
      answer,
    );
    yield put(
      addAnswerSuccess({
        createdQuestionId: questionId,
        addAnswerResponseData: answerResponse.data,
      }),
    );
  } catch (error) {
    console.error(`Ошибка добавления ответа: ${error.message}`);
    throw error;
  }
}
