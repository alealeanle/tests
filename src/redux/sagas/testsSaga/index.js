import { call, put, takeLatest } from 'redux-saga/effects';
import api from '@api';
import { addNewTestSaga, addQuestionSaga, addAnswerSaga } from './addSaga';
import {
  editCurrentTestSaga,
  editQuestionSaga,
  editAnswerSaga,
  changePositionAnswerSaga,
} from './editSaga';
import {
  deleteAnswerSaga,
  deleteCurrentTestSaga,
  deleteQuestionSaga,
} from './deleteSaga';
import {
  fetchTestsRequest,
  fetchTestsSuccess,
  fetchTestsFailure,
  addTestRequest,
  addTestFailure,
  getTestRequest,
  getTestSuccess,
  getTestFailure,
  editTestRequest,
  editTestFailure,
  deleteTestRequest,
  deleteTestFailure,
} from '@models/testsSlice';

function* fetchTestsSaga(action) {
  try {
    const response = yield call(api.get, '/tests', { params: action.payload });
    yield put(fetchTestsSuccess(response.data));
  } catch (error) {
    yield put(fetchTestsFailure(error.message));
  }
}

function* getTestSaga(action) {
  try {
    const response = yield call(api.get, `/tests/${action.payload}`);
    yield put(getTestSuccess(response.data));
  } catch (error) {
    yield put(getTestFailure(error.message));
  }
}

function* addTestSaga(action) {
  try {
    const testId = yield call(addNewTestSaga, action);

    for (const question of action.payload.questions) {
      yield call(addQuestionSaga, testId, question);
    }
  } catch (error) {
    yield put(addTestFailure(error.message));
  }
}

function* editTestSaga(action) {
  try {
    const {
      testId,
      initialTestTitle,
      initialQuestions,
      newTestTitle,
      questions,
    } = action.payload;

    if (initialTestTitle !== newTestTitle) {
      yield call(editCurrentTestSaga, action, testId);
    }

    for (const question of questions) {
      const { answers } = question;
      const initialQuestion = initialQuestions.find(q => q.id === question.id);

      if (initialQuestion) {
        yield call(editQuestionSaga, initialQuestion, question);

        if (initialQuestion && question.question_type !== 'number') {
          const maxLength = Math.max(
            answers.length,
            initialQuestion.answers.length,
          );

          for (let i = 0; i < maxLength; i++) {
            const currentAnswer = answers[i];
            const initialAnswer = initialQuestion.answers[i];

            if (currentAnswer && initialAnswer) {
              if (currentAnswer.key !== initialAnswer.key) {
                yield call(
                  changePositionAnswerSaga,
                  initialAnswer,
                  currentAnswer,
                );
              } else if (initialAnswer) {
                yield call(editAnswerSaga, initialAnswer, currentAnswer);
              }
            } else if (currentAnswer && !initialAnswer) {
              yield call(addAnswerSaga, question.id, currentAnswer);
            } else if (!currentAnswer && initialAnswer) {
              yield call(deleteAnswerSaga, initialAnswer);
            }
          }
        } else if (initialQuestion.answers.length && answers) {
          for (const answer of answers) {
            yield call(deleteAnswerSaga, answer);
          }
        }
      } else {
        yield call(addQuestionSaga, testId, question);
      }
    }

    for (const initQuestion of initialQuestions) {
      if (!questions.find(q => q.id === initQuestion.id)) {
        yield call(deleteQuestionSaga, initQuestion);
      }
    }
  } catch (error) {
    yield put(editTestFailure(error.message));
  }
}

function* deleteTestSaga(action) {
  try {
    yield call(deleteCurrentTestSaga, action.payload.testId);
    yield put(fetchTestsRequest(action.payload.params));
  } catch (error) {
    yield put(deleteTestFailure(error.message));
  }
}

export default function* testsSaga() {
  yield takeLatest(fetchTestsRequest.type, fetchTestsSaga);
  yield takeLatest(addTestRequest.type, addTestSaga);
  yield takeLatest(getTestRequest.type, getTestSaga);
  yield takeLatest(editTestRequest.type, editTestSaga);
  yield takeLatest(deleteTestRequest.type, deleteTestSaga);
}
