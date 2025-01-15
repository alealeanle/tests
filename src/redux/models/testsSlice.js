import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tests: [],
  test: {},
  meta: {},
  loading: false,
  error: null,
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    fetchTestsRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchTestsSuccess: (state, action) => {
      state.tests = action.payload.tests;
      state.meta = action.payload.meta;
      state.loading = false;
    },
    fetchTestsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTestRequest: state => {
      state.loading = true;
      state.error = null;
    },
    addTestSuccess: (state, action) => {
      state.tests.push(action.payload);
      state.loading = false;
    },
    addTestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTestRequest: state => {
      state.loading = true;
      state.error = null;
    },
    getTestSuccess: (state, action) => {
      state.test = action.payload;
      state.loading = false;
    },
    getTestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    editTestRequest: state => {
      state.loading = true;
      state.error = null;
    },
    editTestSuccess: (state, action) => {
      const index = state.tests.findIndex(
        test => test.id === action.payload.id,
      );
      if (index !== -1) {
        state.tests[index] = { ...state.tests[index], ...action.payload };
      }
      state.loading = false;
    },
    editTestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTestRequest: state => {
      state.loading = true;
      state.error = null;
    },
    deleteTestSuccess: (state, action) => {
      state.tests = state.tests.filter(test => test.id !== action.payload.id);
    },
    deleteTestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addQuestionSuccess: (state, action) => {
      const test = state.tests.find(test => test.id === action.payload.testId);
      if (test) {
        test.questions = [...(test.questions || []), action.payload];
      }
    },
    editQuestionSuccess: (state, action) => {
      const test = state.tests.find(test =>
        test.questions.some(q => q.id === action.payload.id),
      );
      if (test) {
        const questionIndex = test.questions.findIndex(
          q => q.id === action.payload.id,
        );
        if (questionIndex !== -1) {
          test.questions[questionIndex] = {
            ...test.questions[questionIndex],
            ...action.payload,
          };
        }
      }
    },
    deleteQuestionSuccess: (state, action) => {
      const test = state.tests.find(test =>
        test.questions.some(q => q.id === action.payload.id),
      );
      if (test) {
        test.questions = test.questions.filter(q => q.id !== action.payload.id);
      }
    },
    addAnswerSuccess: (state, action) => {
      const test = state.tests.find(test =>
        test.questions?.some(q => q.id === action.payload.createdQuestionId),
      );
      if (test) {
        const question = test.questions.find(
          q => q.id === action.payload.createdQuestionId,
        );
        if (question) {
          question.answers = [
            ...(question.answers || []),
            action.payload.addAnswerResponseData,
          ];
        }
      }
    },
    editAnswerSuccess: (state, action) => {
      const test = state.tests.find(test =>
        test.questions.some(q =>
          q.answers.some(a => a.id === action.payload.id),
        ),
      );
      if (test) {
        const question = test.questions.find(q =>
          q.answers.some(a => a.id === action.payload.id),
        );
        if (question) {
          const answerIndex = question.answers.findIndex(
            a => a.id === action.payload.id,
          );
          if (answerIndex !== -1) {
            question.answers[answerIndex] = {
              ...question.answers[answerIndex],
              ...action.payload,
            };
          }
        }
      }
    },
    deleteAnswerSuccess: (state, action) => {
      const test = state.tests.find(test =>
        test.questions.some(q =>
          q.answers.some(a => a.id === action.payload.id),
        ),
      );
      if (test) {
        const question = test.questions.find(q =>
          q.answers.some(a => a.id === action.payload.id),
        );
        if (question) {
          question.answers = question.answers.filter(
            a => a.id !== action.payload.id,
          );
        }
      }
    },
  },
});

export const {
  fetchTestsRequest,
  fetchTestsSuccess,
  fetchTestsFailure,
  addTestRequest,
  addTestSuccess,
  addTestFailure,
  getTestRequest,
  getTestSuccess,
  getTestFailure,
  editTestRequest,
  editTestSuccess,
  editTestFailure,
  deleteTestRequest,
  deleteTestSuccess,
  deleteTestFailure,
  addQuestionSuccess,
  editQuestionSuccess,
  deleteQuestionSuccess,
  addAnswerSuccess,
  editAnswerSuccess,
  deleteAnswerSuccess,
} = testsSlice.actions;

export default testsSlice.reducer;
