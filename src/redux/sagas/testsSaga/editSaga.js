import { call, put } from 'redux-saga/effects';
import api from '@api';
import {
  editTestSuccess,
  editQuestionSuccess,
  editAnswerSuccess,
} from '@models/testsSlice';
import { deleteAnswerSaga } from './deleteSaga';

export function* editCurrentTestSaga(action, testId) {
  try {
    const editTestResponse = yield call(api.patch, `/tests/${testId}`, {
      title: action.payload.newTestTitle,
    });
    yield put(editTestSuccess(editTestResponse.data));
  } catch (error) {
    console.error(`Ошибка редактирования теста: ${error.message}`);
    throw error;
  }
}

export function* editQuestionSaga(initialQuestion, question) {
  try {
    const isQuestionTypeChanged =
      question.question_type !== initialQuestion.question_type;
    const isTitleChanged = question.title !== initialQuestion.title;
    const isAnswerChanged =
      question.question_type === 'number' &&
      question.answer !== initialQuestion.answer;

    if (isQuestionTypeChanged || isTitleChanged || isAnswerChanged) {
      if (question.question_type === 'number') {
        yield call(api.patch, `/questions/${question.id}`, {
          title: question.title,
          question_type: question.question_type,
          answer: Number(question.answer),
        });

        for (const answer of initialQuestion.answers || []) {
          deleteAnswerSaga(answer);
        }
      } else {
        yield call(api.patch, `/questions/${question.id}`, {
          title: question.title,
          question_type: question.question_type,
          answer: 0,
        });
      }
      yield put(editQuestionSuccess(question));
    }
  } catch (error) {
    console.error(`Ошибка редактирования вопроса: ${error.message}`);
    throw error;
  }
}

export function* editAnswerSaga(initialAnswer, answer) {
  try {
    if (
      answer.text !== initialAnswer.text ||
      answer.is_right !== initialAnswer.is_right
    ) {
      yield call(api.patch, `/answers/${answer.id}`, {
        text: answer.text,
        is_right: answer.is_right,
      });
      yield put(editAnswerSuccess(answer));
    }
  } catch (error) {
    console.error(`Ошибка редактирования ответа: ${error.message}`);
    throw error;
  }
}

export function* changePositionAnswerSaga(initialAnswer, answer) {
  try {
    if (
      answer.text !== initialAnswer.text ||
      answer.is_right !== initialAnswer.is_right
    ) {
      yield call(api.patch, `/answers/${initialAnswer.id}`, {
        text: answer.text,
        is_right: answer.is_right,
      });
      yield put(editAnswerSuccess(answer));
    }
  } catch (error) {
    console.error(`Ошибка редактирования ответа: ${error.message}`);
    throw error;
  }
}
